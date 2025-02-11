/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'MedusaNOPRegistryService',
  extends: 'foam.core.medusa.MedusaRegistryService',

  javaImports: [
    'foam.lang.FObject',
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'latch',
      javaCode: `
      return null;
      `
    },
    {
      name: 'wait',
      javaCode: `
      return null;
      `
    },
    {
      name: 'notify',
      javaCode: `
      // nop
      `
    },
    {
      name: 'count',
      javaCode: `
      return 0L;
      `
    }
  ]
});
