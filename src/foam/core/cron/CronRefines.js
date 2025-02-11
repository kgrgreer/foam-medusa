/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.cron',
  name: 'CronRefines',
  refines: 'foam.core.cron.Cron',

  methods: [
    {
      name: 'canRun',
      args: 'Context x',
      type: 'Boolean',
      javaCode: `
        if ( getClusterable() ) {
          foam.core.medusa.MedusaSupport support = (foam.core.medusa.MedusaSupport) x.get("medusaSupport");
          if ( support != null &&
               ! support.cronEnabled(x, getClusterable()) ) {
            // ((Logger) x.get("logger")).debug(this.getClass().getSimpleName(), "execution disabled.", getId(), getDescription());
            return false;
          }
        }
        if ( getReattemptRequested() )
          return getReattempts() < getMaxReattempts();

        return true;
      `
    }
  ]
})
