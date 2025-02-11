/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'MedusaEmailFolderAgent',
  extends: 'foam.core.notification.email.EmailFolderAgent',

  javaImports: [
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'execute',
      args: 'X x',
      javaCode: `
        foam.core.medusa.MedusaSupport support = (foam.core.medusa.MedusaSupport) x.get("medusaSupport");
        if ( support != null &&
             ! support.cronEnabled(x, true) ) {
          // Loggers.logger(x, this).debug("execution disabled");
          return;
        }
        super.execute(x);
      `
    }
  ]
})
