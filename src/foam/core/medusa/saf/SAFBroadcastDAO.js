/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
foam.CLASS({
  package: 'foam.core.medusa.saf',
  name: 'SAFBroadcastDAO',
  extends: 'foam.core.saf.SAFBroadcastDAO',

  javaImports: [
    'foam.dao.DAO',
    'foam.dao.DOP',
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'foam.core.medusa.ClusterConfig',
    'foam.core.medusa.ClusterConfigSupport',
    'foam.core.medusa.MedusaType',
    'foam.core.medusa.Status',
    'foam.core.saf.SAFEntry',
    'foam.core.saf.SAFManager',
    'foam.lang.Agency',
    'foam.lang.ContextAgent',
    'foam.lang.FObject',
    'foam.lang.X'
  ],

  methods: [
    {
      documentation: 'Broadcast to mediators',
      name: 'broadcast',
      args: 'Context x, FObject obj, DOP dop',
      javaCode: `
      //Find other mediators and send.

      ClusterConfigSupport support = (ClusterConfigSupport) getX().get("clusterConfigSupport");
      ClusterConfig myConfig = support.getConfig(x, support.getConfigId());

      if ( myConfig.getType() != MedusaType.MEDIATOR || myConfig.getStatus() != Status.ONLINE ) return;

      final SAFManager safManager = (SAFManager) x.get("safManager");

      SAFEntry entry = x.create(SAFEntry.class);
      entry.setCSpecName(getCSpec().getName());
      entry.setDop(dop);
      entry.setObject(obj);

      Agency agency = (Agency) x.get(support.getThreadPoolName());
      for ( ClusterConfig config : support.getSafBroadcastMediators() ) {
        if ( config.getId().equals(myConfig.getId()) ) continue;
        agency.submit(x, new ContextAgent() {
          public void execute(X x) {
            try {
              DAO clientDAO = (DAO) safManager.getSafs().get(config.getId());
              clientDAO.put_(x, (SAFEntry) entry.fclone());
            } catch ( Throwable t ) {
              Loggers.logger(x, this, getCSpec().getName()).error(config.getId(), t);
            }
          }
        }, this.getClass().getSimpleName());
      }

      return;
      `
    }
  ]
});
