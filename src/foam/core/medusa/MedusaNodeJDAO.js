/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'MedusaNodeJDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: 'Skip writing to transient data to Journal',

  javaImports: [
    'foam.dao.DAO',
    'foam.dao.FileRollCmd',
    'foam.dao.Journal',
    'foam.dao.java.JDAO'
  ],

  properties: [
    {
      name: 'journal',
      class: 'FObjectProperty',
      of: 'foam.dao.Journal'
    }
  ],

  javaCode: `
    public MedusaNodeJDAO(foam.lang.X x, DAO delegate, Journal journal) {
      setX(x);
      setOf(foam.core.medusa.MedusaEntry.getOwnClassInfo());
      setDelegate(delegate);
      setJournal(journal);
    }
  `,

  methods: [
    {
      documentation: `Only write non-trasient data to the journal.
Otherwise just update the dao (mdao) - with storageTransient data.`,
      name: 'put_',
      javaCode: `
      MedusaEntry entry = (MedusaEntry) obj;
      if ( ! foam.util.SafetyUtil.isEmpty(entry.getData()) ) {
        return getJournal().put(x, "", getDelegate(), entry);
      }
      return getDelegate().put_(x, entry);
      `
    },
    {
      name: 'cmd_',
      javaCode: `
      foam.core.logger.Loggers.logger(x, this).debug("cmd",obj);
      if ( obj instanceof FileRollCmd ) {

        // Roll the Journal
        obj = getJournal().cmd(x, obj);
        if ( obj != null &&
             foam.util.SafetyUtil.isEmpty(((FileRollCmd) obj).getError()) ) {
          ((DAO) x.get("medusaNodeDAO")).cmd_(x, DAO.PURGE_CMD);

          // TODO: wnat needs to occur - to have ledger recreated.
          // the reset delegate which will recreate the
          // the Journal, MessageDigest, and trigger replay
          // JDAO jdao = (JDAO) getDelegate();
          // var delegate = jdao.getDelegate();
          // jdao.clearDelegate();
          // jdao.setDelegate(delegate);

          ReplayingInfo replaying = (ReplayingInfo) x.get("replayingInfo");
          replaying.clearCount();
        }
        return obj;
      } else {
        return getDelegate().cmd_(x, obj);
      }
      `
    }
  ]
});
