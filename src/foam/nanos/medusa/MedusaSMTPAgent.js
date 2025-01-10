/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.medusa',
  name: 'MedusaSMTPAgent',
  extends: 'foam.nanos.notification.email.SMTPAgent',

  javaImports: [
    'foam.core.X',
//    'jakarta.mail.Session',
//    'jakarta.mail.Transport'
  ],

  methods: [
    {
      name: 'execute',
      args: 'X x',
      javaCode: `
      foam.nanos.medusa.MedusaSupport support = (foam.nanos.medusa.MedusaSupport) x.get("medusaSupport");
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
