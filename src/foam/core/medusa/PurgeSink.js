/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'PurgeSink',
  extends: 'foam.dao.ProxySink',

  documentation: `Remove old entries from MedusaEntry DAO and cleanup MedusaRegistry`,

  javaImports: [
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.dao.Sink',
    'foam.core.medusa.MedusaRegistry'
  ],

  javaCode: `
    public PurgeSink(X x, Sink delegate) {
      super(x, delegate);
    }
 `,

  properties: [
    {
      documentation: 'MedusaRegistry for the life of the Sink',
      name: 'registry',
      class: 'FObjectProperty',
      of: 'foam.core.medusa.MedusaRegistry',
      javaFactory: 'return (MedusaRegistry) getX().get("medusaRegistry");'
    }
  ],

  methods: [
    {
      name: 'put',
      javaCode: `
      MedusaEntry entry = (MedusaEntry) ((FObject)obj).fclone();
      getRegistry().notify(getX(), entry);
      // foam.core.logger.Loggers.logger(getX(), this).debug("delete", entry.toSummary());
      getDelegate().put(entry, sub);
      `
    }
  ]
});
