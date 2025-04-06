/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'MedusaNodeBootstrapAgent',

  documentation: 'Node initialization - verify ledger',

  implements: [
    'foam.lang.ContextAgent',
    'foam.lang.ContextAware',
    'foam.core.COREService'
  ],

  javaImports: [
    'foam.lang.ContextAgentTimerTask',
    'foam.lang.ContextAgent',
    'foam.lang.X',
    'foam.dao.DAO',
    'static foam.mlang.MLang.MAX',
    'foam.mlang.sink.Max',
    'foam.core.logger.Loggers',
    'java.util.Timer'
  ],

  properties: [
    {
      name: 'initialTimerDelay',
      class: 'Int',
      units: 'ms',
      value: 5000
    },
    {
      documentation: 'Store reference to timer so it can be cancelled, and agent restarted.',
      name: 'timer',
      class: 'Object',
      visibility: 'HIDDEN',
      networkTransient: true
    }
  ],

  methods: [
    {
      documentation: 'Start as a COREService',
      name: 'start',
      javaCode: `
      Timer timer = new Timer(this.getClass().getSimpleName(), true);
      setTimer(timer);
      timer.schedule(
        new ContextAgentTimerTask(getX(), this),
        getInitialTimerDelay());
      `
    },
    {
      name: 'execute',
      args: 'Context x',
      javaCode: `
      ClusterConfigSupport support = (ClusterConfigSupport) x.get("clusterConfigSupport");
      ClusterConfig config = support.getConfig(x, support.getConfigId());

      if ( config.getType() == MedusaType.NODE &&
           config.getEnabled() &&
           config.getStatus() == Status.OFFLINE ) {
        Loggers.logger(x, this).info("execute", config.getId());
        // Wait for own replay to complete,
        // then set node ONLINE.
        ReplayingInfo replaying = (ReplayingInfo) x.get("replayingInfo");
        if ( replaying.getStartTime() == null ) {
          replaying.setStartTime(new java.util.Date());
        }
        ((foam.core.om.OMLogger) x.get("OMLogger")).log("medusa.bootstrap.bootstrap.replay.start");

        DAO dao = ((DAO) x.get("medusaNodeDAO"));
        if ( replaying.getEndTime() == null ) {
          replaying.setEndTime(new java.util.Date());
          Max max = (Max) dao.select(MAX(MedusaEntry.INDEX));
          replaying.setReplaying(false);
          ((foam.core.om.OMLogger) x.get("OMLogger")).log("medusa.bootstrap.replay.end");
          if ( max != null &&
               max.getValue() != null ) {
            replaying.updateIndex(x, (Long)max.getValue());
            replaying.setReplayIndex((Long)max.getValue());
          }
        }
        config = (ClusterConfig) config.fclone();
        config.setStatus(Status.ONLINE);
        ((DAO) x.get("localClusterConfigDAO")).put(config);
      }
      `
    }
  ]
});
