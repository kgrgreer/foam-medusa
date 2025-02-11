/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'CompactionSink',
  extends: 'foam.dao.ProxySink',

  documentation: 'Find CompactionSink Facet for nspec dao of',

  javaImports: [
    'foam.lang.ClassInfo',
    'foam.lang.ContextAware',
    'foam.lang.X',
    'foam.lang.FacetManager',
    'foam.dao.DAO',
    'foam.dao.AbstractSink',
    'foam.dao.ProxySink',
    'foam.dao.Sink',
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'java.util.HashMap',
    'java.util.Map'
  ],

  javaCode: `
    public CompactionSink(X x, Sink delegate) {
      super(x, delegate);
    }
  `,

  properties: [
    {
      name: 'sinks',
      class: 'Map',
      javaFactory: 'return new HashMap();'
    }
  ],

  methods: [
    {
      name: 'put',
      javaCode: `
      getSink(getX(), obj).put(obj, sub);
      `
    },
    {
      name: 'getSink',
      args: 'X x, Object obj',
      type: 'foam.dao.Sink',
      javaCode: `
      MedusaEntry entry = (MedusaEntry) obj;
      Sink sink = (Sink) getSinks().get(entry.getCSpecName());
      if ( sink != null ) return sink;

      Logger logger = Loggers.logger(x, this, "getSink");
      DAO dao = (DAO) x.get(entry.getCSpecName());
      if ( dao == null ) {
        if ( ! "bootstrap".equals(entry.getCSpecName()) ) {
          logger.error("CSpec not found", entry.getCSpecName());
        }
        getSinks().put(entry.getCSpecName(), getDelegate());
      } else {
        Compaction compaction = (Compaction) ((DAO) getX().get("compactionDAO")).find(entry.getCSpecName());
        if ( compaction != null ) {
          if ( ! compaction.getCompactible() ) {
            ((Logger) x.get("logger")).info("CompactionSink",entry.getCSpecName(), "sink,null");
            getSinks().put(entry.getCSpecName(), new AbstractSink());
          } else {
            getSinks().put(entry.getCSpecName(), getFacetedSink(x, entry));
          }
        } else {
          ((Logger) x.get("logger")).info("CompactionSink",entry.getCSpecName(), "sink,delegate");
          getSinks().put(entry.getCSpecName(), getDelegate());
        }
      }

      return (Sink) getSinks().get(entry.getCSpecName());
      `
    },
    {
      name: 'getFacetedSink',
      args: 'X x, MedusaEntry entry',
      type: 'Sink',
      javaCode: `
      DAO dao = (DAO) x.get(entry.getCSpecName());
      Compaction compaction = (Compaction) ((DAO) getX().get("compactionDAO")).find(entry.getCSpecName());

      Sink sink = (Sink) compaction.getSink();
      if ( sink == null ) {
        try {
          FacetManager fm = (FacetManager) x.get("facetManager");
          sink = (Sink) fm.create(dao.getOf().getId()+"CompactionSink", x);
        } catch (Throwable t) {
          // nop
        }
      }

      if ( sink != null ) {
        if ( sink instanceof ContextAware ) {
          ((ContextAware) sink).setX(x);
        }
        ((ProxySink) sink).setDelegate(getDelegate());
      } else {
        sink = getDelegate();
      }

      ((Logger) x.get("logger")).info("CompactionSink",entry.getCSpecName(), "sink",sink.getClass().getName());
      return sink;
      `
    }
  ]
});
