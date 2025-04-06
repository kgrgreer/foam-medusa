/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.security',
  name: 'DigestJournal',
  extends: 'foam.dao.F3FileJournal',

  javaImports: [
    'foam.core.logger.Loggers',
    'foam.core.pm.PM',
    'foam.core.security.MessageDigest',
    'foam.dao.DAO',
    'foam.dao.FileRollCmd',
    'foam.lang.ClassInfo',
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.lib.formatter.JSONFObjectFormatter',
    'foam.lib.StoragePropertyPredicate',
    'foam.util.SafetyUtil',
    'java.io.BufferedReader',
    'java.util.concurrent.atomic.AtomicInteger'
  ],

  properties: [
    {
      name: 'messageDigest',
      class: 'FObjectProperty',
      of: 'foam.core.security.MessageDigest',
      javaFactory: 'return new MessageDigest();'
    }
  ],

  javaCode: `
    public DigestJournal(X x, String filename, MessageDigest messageDigest) {
      setX(x); 
      setFilename(filename);
      setMessageDigest(messageDigest);
    }

    protected static ThreadLocal<DigestJSONParser> PARSER = new ThreadLocal<DigestJSONParser>() {
      @Override
      protected DigestJSONParser initialValue() {
        return new DigestJSONParser();
      }
      @Override
      public DigestJSONParser get() {
        DigestJSONParser parser = super.get();
        return parser;
      }
    };

    protected DigestJSONParser getParser(X x) {
      DigestJSONParser p = PARSER.get();
      p.setX(x);
      // This parser is used for replay only.  Each call for a parser is a
      // replay request, and each replay must use a new/reset MessageDigest.
      MessageDigest md = (MessageDigest) getMessageDigest().fclone();
      md.reset();
      p.setMessageDigest(md);
      return p;
    }

    protected static ThreadLocal<JSONFObjectFormatter> FORMATTER = new ThreadLocal<JSONFObjectFormatter>() {
      @Override
      protected JSONFObjectFormatter initialValue() {
        return new JSONFObjectFormatter();
      }
      @Override
      public JSONFObjectFormatter get() {
        JSONFObjectFormatter b = super.get();
        b.reset();
        b.setPropertyPredicate(new StoragePropertyPredicate());
        b.setOutputDefaultValues(true);
        b.setOutputShortNames(true);
        b.setOutputClassNames(false);
        b.setOutputDefaultClassNames(false);
        return b;
      }
    };
  `,

  methods: [
    {
      name: 'put',
      type: 'FObject',
      args: 'X x, String prefix, DAO dao, FObject obj',
      javaCode: `
        final Object               id  = obj.getProperty("id");
        final ClassInfo            of  = dao.getOf();
        getLine().enqueue(new foam.util.concurrent.AbstractAssembly() {
          FObject old;
          JSONFObjectFormatter fmt;
          public Object[] requestLocks() {
            return new Object[] { id };
          }
          public void executeUnderLock() {
            old = dao.find_(x, id);
            dao.put_(x, obj);
          }
          public void executeJob() {
            try {
              /*
                Note:
                Unlike we usually do, this JSONFObjectFormatter cannot be reused as a
                ThreadLocal variable because it is used by multiple threads as
                executeJob() is handled by a different Thread than endJob() which also
                needs the Thread. By the time the endJob() is called, the Thread which
                performed executeJob() may already be asked to execute again.
                If performance becomes an issue, then these JSONFobjectFormatters could
                be reused, but rather than using ThreadLocal, an Object Pool would need
                to be used. The same thing is done in remove().
              */
              fmt = new JSONFObjectFormatter(x);
              fmt.setPropertyPredicate(new StoragePropertyPredicate());
              fmt.setOutputShortNames(true);
              fmt.setQuoteKeys(false);
              if ( old != null ) {
                fmt.maybeOutputDelta(old, obj, null, of);
              } else {
                fmt.output(obj, of);
              }
            } catch (Throwable t) {
              Loggers.logger(x, this).error("Failed to prepare put entry for journal", t);
              fmt.reset();
            }
          }
          public void endJob(boolean isLast) {
            if ( fmt != null &&
                 fmt.builder().length() == 0 ) return;
            MessageDigest md = getMessageDigest();
            md.update(fmt.builder().toString());
            JSONFObjectFormatter digestFormatter = FORMATTER.get();
            digestFormatter.output(md.get(), MessageDigest.getOwnClassInfo(), null);
            fmt.builder().append(',');
            fmt.builder().append(digestFormatter.builder().toString());
            try {
              writeComment_(x, obj);
              writePut_(
                x,
                fmt.builder(),
                getMultiLineOutput() ? "\\n" : "",
                foam.util.SafetyUtil.isEmpty(prefix) ? "" : prefix + ".");
              if ( isLast ) getWriter().flush();
            } catch (Throwable t) {
              Loggers.logger(x, this).error("Failed to write put entry to journal", t);
            } finally {
              fmt.reset();
            }
          }
        });
        return obj;
      `
    },
    {
      name: 'remove',
      type: 'FObject',
      args: 'X x, String prefix, DAO dao, FObject obj',
      javaCode: `
        final Object               id  = obj.getProperty("id");
        final ClassInfo            of  = dao.getOf();
        getLine().enqueue(new foam.util.concurrent.AbstractAssembly() {
          JSONFObjectFormatter fmt;
          public Object[] requestLocks() {
            return new Object[] { id };
          }
          public void executeUnderLock() {
            dao.remove_(x, obj);
          }
          public void executeJob() {
            try {
              /*
                Note: See the note above in put().
              */
              fmt = new JSONFObjectFormatter(x);
              FObject toWrite = (FObject) obj.getClassInfo().newInstance();
              toWrite.setProperty("id", id);
              fmt.output(toWrite, of);
            } catch (Throwable t) {
              Loggers.logger(x, this).error("Failed to prepare remove entry for journal", t);
              fmt.reset();
            }
          }
          public void endJob(boolean isLast) {
            if ( fmt != null &&
                 fmt.builder().length() == 0 ) return;
            MessageDigest md = getMessageDigest();
            md.update(fmt.builder().toString());
            JSONFObjectFormatter digestFormatter = FORMATTER.get();
            digestFormatter.output(md.get(), MessageDigest.getOwnClassInfo(), null);
            fmt.builder().append(',');
            fmt.builder().append(digestFormatter.builder().toString());
            try {
              writeComment_(x, obj);
              writeRemove_(
                x,
                fmt.builder(),
                foam.util.SafetyUtil.isEmpty(prefix) ? "" : prefix + ".");
              if ( isLast ) getWriter().flush();
            } catch (Throwable t) {
              Loggers.logger(x, this).error("Failed to write remove entry to journal", t);
            } finally {
              fmt.reset();
            }
          }
        });
        return obj;
      `
    },
    {
      documentation: 'Replays the journal file, expected to be single threaded, does not use assembly as entries are ordered.',
      name: 'replay',
      args: 'X x, DAO dao',
      javaCode: `
        DigestJSONParser parser = getParser(x);
        AtomicInteger successReading = new AtomicInteger();
        PM pm = new PM(this.getClass().getSimpleName(), dao.getOf().getId(), "replay", getFilename());
        try ( BufferedReader reader = getReader() ) {
          if ( reader == null ) {
            return;
          }
          Class defaultClass = dao.getOf().getObjClass();
          for (  CharSequence entry ; ( entry = getEntry(reader) ) != null ; ) {
            int length = entry.length();
            if ( length == 0 ) continue;
            if ( COMMENT.matcher(entry).matches() ) continue;
            try {
              final char operation = entry.charAt(0);
              final String strEntry = entry.subSequence(2, length - 1).toString();
              FObject obj = parser.parseString(strEntry, defaultClass);
              if ( obj == null ) {
                Loggers.logger(x, this).error("Parse error", getParsingErrorMessage(strEntry), "entry:", strEntry);
                return;
              }
              switch ( operation ) {
                case 'p':
                  foam.lang.FObject old = dao.find(obj.getProperty("id"));
                  dao.put(old != null ? mergeFObject(old.fclone(), obj) : obj);
                  break;
                case 'r':
                  dao.remove(obj);
                  break;
              }
              successReading.incrementAndGet();
            } catch ( Throwable t ) {
              Loggers.logger(x, this).error("Error replaying journal entry:", entry, t);
              throw t;
            }
          }
        } catch ( Throwable t) {
          pm.error(x, t);
          Loggers.logger(x, this).error("Failed to read from journal", t);
          throw new RuntimeException(t);
        } finally {
          pm.log(x);
          Loggers.logger(x, this).info("Successfully read " + successReading.get() + " entries from file: " + getFilename() + " in: " + pm.getTime() + "(ms)");
        }
      `
    }
  ]
});
