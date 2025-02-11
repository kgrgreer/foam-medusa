/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'MedusaSMTPAgent',
  extends: 'foam.core.notification.email.SMTPAgent',

  javaImports: [
    'foam.lang.X',
//    'jakarta.mail.Session',
//    'jakarta.mail.Transport'
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
