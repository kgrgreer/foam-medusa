/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa.test',
  name: 'MedusaTestObjectCompactionSink',
  extends: 'foam.dao.ProxySink',
  implements: ['foam.lang.ContextAware'],

  methos: [
    {
      name: 'put',
      args: 'Any obj, foam.lang.Detachable sub',
      javaCode: `
      if ( ((MedusaTestObject) obj).getId().hashCode() % 2 == 0) {
        getDelegate().put(obj, sub);
      } else {
        ((Logger) getX().get("logger")).info("MedusaTestObjectCompactionSink,discard",((MedusaTestObject) obj).getId());
      }
      `
    }
  ]
});
