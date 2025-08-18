/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'MedusaStatusWatcher',
  extends: 'foam.core.fs.Watcher',

  documentation: 'Monitor watch directory for the apperance of a file named OFFLINE which will trigger the instance to transition to OFFLINE.  This will allow ssh control of an mediator or node.',

  javaImports: [
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'foam.dao.DAO',
    'foam.lang.X',
    'foam.util.SafetyUtil',
    'java.util.ArrayList',
    'java.util.Arrays',
    'java.util.List',
    'java.util.stream.Collectors',
    'java.io.File',
    'java.io.IOException',
    'java.nio.file.Files',
    'java.nio.file.Path',
    'java.nio.file.Paths'
  ],

  constants: [
    {
      name: 'ONLINE',
      type: 'String',
      value: 'ONLINE'
    },
    {
      name: 'OFFLINE',
      type: 'String',
      value: 'OFFLINE'
    },
    {

      name: 'SHUTDOWN',
      type: 'String',
      value: 'SHUTDOWN'
    },
    {
      name: 'DISSOLVE',
      type: 'String',
      value: 'DISSOLVE'
    },
    {
      name: 'SIR',
      type: 'String',
      value: 'SIR'
    }
  ],

  properties: [
    {
      name: 'initialTimerDelay',
      class: 'Int',
      value: 60000
    }
 ],

  methods: [
    {
      name: 'acceptRequest',
      javaCode: `
      return ONLINE.equals(request) ||
           OFFLINE.equals(request) ||
           SHUTDOWN.equals(request) ||
           DISSOLVE.equals(request) ||
           SIR.equals(request);
      `
    },
    {
      name: 'handleRequest',
      javaCode: `
      Logger logger = Loggers.logger(x, this);

              ClusterConfigSupport support = (ClusterConfigSupport) x.get("clusterConfigSupport");
              if ( support != null ) {
                if ( SHUTDOWN.equals(request) ) {
                  support.setShutdown(true);
                  request = OFFLINE;
                }
                ClusterConfig config = support.getConfig(x, support.getConfigId());
                config = (ClusterConfig) config.fclone();
                if ( OFFLINE.equals(request) &&
                     config.getStatus() != Status.OFFLINE ) {
                  config.setStatus(Status.OFFLINE);
                  ((DAO) x.get("localClusterConfigDAO")).put(config);
                } else if ( ONLINE.equals(request) &&
                            config.getStatus() != Status.ONLINE ) {
                  config.setStatus(Status.ONLINE);
                  ((DAO) x.get("localClusterConfigDAO")).put(config);
                } else if ( DISSOLVE.equals(request) &&
                            config.getStatus() == Status.ONLINE &&
                            config.getType() == MedusaType.MEDIATOR ) {
                  ElectoralService electoral = (ElectoralService) x.get("electoralService");
                  electoral.dissolve(x);
                } else if ( SIR.equals(request) &&
                            config.getType() == MedusaType.MEDIATOR ) {
                  try {
                    Path path = Paths.get(getWatchDir());
                    Path file = path.resolve(request);
                    String contents = Files.readAllLines(file).get(0);
                    logger.info("SIR contents", contents);
                    if ( ! SafetyUtil.isEmpty(contents) ) {
                      List<Long> sir =
                        Arrays.stream(contents
                         .split(","))
                         .map(String::trim)
                         .map(Long::valueOf)
                         .collect(Collectors.toList());
                       logger.warning("SIR", sir.toString());
                       support.setSir(sir);
                    } else {
                      logger.warning("SIR ignored, system is not replaying");
                    }
                  } catch (Exception e) {
                    logger.warning("SIR processing failed", e.getMessage());
                  }
                }
              }
      `
    },
    {
      name: 'preCleanup',
      javaCode: `
      try {
        Path existing = Paths.get(getWatchDir(), OFFLINE);
        Files.deleteIfExists(existing);
        existing.toFile().deleteOnExit();
      } catch ( IOException e) {
        // Can fail to delete when it was touch by root, for example.
        Loggers.logger(x, this).warning(e);
      }

      try {
        Path existing = Paths.get(getWatchDir(), SHUTDOWN);
        Files.deleteIfExists(existing);
        existing.toFile().deleteOnExit();
      } catch ( IOException e) {
        Loggers.logger(x, this).warning(e);
      }
      `
    }
  ]
});
