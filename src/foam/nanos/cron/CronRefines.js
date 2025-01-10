/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.cron',
  name: 'CronRefines',
  refines: 'foam.nanos.cron.Cron',

  methods: [
    {
      name: 'canRun',
      args: 'Context x',
      type: 'Boolean',
      javaCode: `
        if ( getClusterable() ) {
          foam.nanos.medusa.MedusaSupport support = (foam.nanos.medusa.MedusaSupport) x.get("medusaSupport");
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
