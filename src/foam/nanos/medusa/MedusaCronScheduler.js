/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.medusa',
  name: 'MedusaCronScheduler',
  extends: 'foam.nanos.cron.CronScheduler',

  documentation: `Augments the cron scheduler in a medusa environment.
In medusa there are two cron daos, one for active jobs. On scheduling execute
enabled jobs are copied to the cronjob dao.`,

  javaImports: [
    'foam.core.Agency',
    'foam.core.AgencyTimerTask',
    'foam.core.Detachable',
    'foam.core.FObject',
    'foam.dao.DAO',
    'foam.dao.Sink',
    'foam.log.LogLevel',
    'foam.mlang.MLang',
    'foam.nanos.alarming.Alarm',
    'foam.nanos.alarming.AlarmReason',
    'foam.nanos.auth.EnabledAware',
    'foam.nanos.cron.Cron',
    'foam.nanos.cron.SimpleIntervalSchedule',
    'foam.nanos.logger.Logger',
    'foam.nanos.logger.Loggers',
    'java.util.Timer'
  ],

  properties: [
    {
      name: 'cronDAO',
      class: 'String',
      value: 'cronDAO',
    }
  ],

  methods: [
    {
      name: 'execute',
      javaCode: `
    final Logger logger = Loggers.logger(x, this);
    try {
      // Wait until Medusa Replay is complete
      foam.nanos.medusa.MedusaSupport support = (foam.nanos.medusa.MedusaSupport) x.get("medusaSupport");
      if ( support != null &&
           support.isReplaying(x) ) {
        logger.debug("execute", "replaying");
        Timer timer = new Timer(this.getClass().getSimpleName());
        timer.schedule(
          new AgencyTimerTask(x, this),
          getInitialTimerDelay());
        return;
      }

      logger.info("initialize", "cronjobs", "start");
      // copy all entries to from cronjob to localCronDAO for execution
      final DAO cronDAO = (DAO) getX().get(getCronDAO());
      final DAO cronJobDAO = (DAO) getX().get(getCronJobDAO());
      cronDAO.where(MLang.EQ(Cron.ENABLED, true)).
        select(new Sink() {
          public void put(Object obj, Detachable sub) {
            Cron cron = (Cron) ((FObject) obj).fclone();
            cron.setScheduledTime(cron.getNextScheduledTime(getX()));
            cronJobDAO.put(cron);
          }
          public void remove(Object obj, Detachable sub) {}
          public void eof() {}
          public void reset(Detachable sub) {}
        });
      logger.info("initialize", "cronjobs", "complete");
      super.execute(x);
    } catch (Throwable t) {
      logger.error(t.getMessage(), t);
      ((DAO) x.get("alarmDAO")).put(new foam.nanos.alarming.Alarm.Builder(x)
        .setName("CronScheduler")
        .setSeverity(foam.log.LogLevel.ERROR)
        .setNote(t.getMessage())
        .build());
    }
    `
    }
  ]
});
