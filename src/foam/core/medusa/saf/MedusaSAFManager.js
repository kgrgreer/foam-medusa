/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa.saf',
  name: 'MedusaSAFManager',
  extends: 'foam.core.saf.SAFManager',
  
  javaImports: [
    'foam.core.fs.FileSystemStorage',
    'foam.core.fs.Storage',
    'foam.core.medusa.ClusterConfig',
    'foam.core.medusa.ClusterConfigSupport',
    'foam.core.medusa.MedusaType',
    'foam.core.medusa.Status',
    // 'foam.core.saf.*',
    'foam.core.saf.SAF',
    'foam.core.saf.SAFManager',
    'foam.dao.DAO',
    'foam.dao.DOP',
    'foam.dao.EasyDAO',
    'foam.dao.ProxyDAO',
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.util.retry.RetryForeverStrategy',
    'foam.util.retry.RetryStrategy',
    'java.nio.file.attribute.*',
    'java.util.*',
    'java.util.PriorityQueue'
  ],

  constants: [
    {
      type: 'Integer',
      name: 'MAXIMUM_REPLAY_DAYS',
      value: 365
    }
  ],
  
  properties: [
    {
      class: 'Int',
      name: 'timeWindow',
      units: 's',
      value: -1
    },
    {
      class: 'Int',
      name: 'fileCapacity',
      value: 4096
    },
    // {
    //   class: 'String',
    //   name: 'folderName',
    //   value: '../saf/'
    // },
    {
      class: 'Int',
      documentation: 'set 0 or less replay nothing; set to MAXIMUM_REPLAY_DAYS or bigger replay all',
      name: 'replayStrategy',
      units: 'days',
      javaSetter: `
        replayStrategyIsSet_ = true;
        if ( val <= 0 ) replayStrategy_ = 0;
        else if ( val >=  MAXIMUM_REPLAY_DAYS ) replayStrategy_ = MAXIMUM_REPLAY_DAYS;
        else replayStrategy_ = val;
      `,
      value: 0
    }
  ],
  
  methods: [
    {
      name: 'createClient',
      args: 'X x, String id',
      type: 'SAF',
      javaCode: `
      ClusterConfigSupport support = (ClusterConfigSupport) x.get("clusterConfigSupport");
      ClusterConfig myConfig = support.getConfig(x, support.getConfigId());
      ClusterConfig config = support.getConfig(x, support.getConfigId());
      SAFMedusaClientDAO saf = new SAFMedusaClientDAO(x);
      saf.setId(config.getId());
      saf.setFileName(config.getId());
      saf.setMyConfig(myConfig);
      saf.setToConfig(config);
      // foam-saf uses this, does medusa need it?
      // saf.setDelegate(support.getBroadcastClientDAO(x, saf.getServiceName(), senderConfig, receiverConfig));
      return saf;
      `
    },
    {
      name: 'getBroadcastIds',
      args: 'X x',
      type: 'List',
      javaCode: `
      ClusterConfigSupport support = (ClusterConfigSupport) getX().get("clusterConfigSupport");
      ClusterConfig myConfig = support.getConfig(getX(), support.getConfigId());
      List<String> ids = new ArrayList();
      if ( myConfig.getType() == MedusaType.MEDIATOR ) {
        for ( ClusterConfig config : support.getSafBroadcastMediators() ) {
          if ( config.getId().equals(myConfig.getId()) )
            continue;
          ids.add(config.getId());
        }
      }
      return ids;
      `
    },
    // {
    //   name: 'getFileSuffix',
    //   documentation: 'help method to get suffix from file name',
    //   javaType: 'int',
    //   args: 'String filename',
    //   javaCode: `
    //     return Integer.parseInt(filename.split("\\\\.")[filename.split("\\\\.").length-1]);
    //   `
    // },
  ]
});
