/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
foam.CLASS({
  package: 'foam.core.medusa.saf',
  name: 'SAFBroadcastReceiverDAO',
  extends: 'foam.dao.ProxyDAO',

  javaImports: [
    'foam.core.logger.Loggers',
    'foam.core.pm.PM',
    'foam.core.saf.SAFEntry',
    'foam.dao.DAO',
    'foam.dao.DOP',
    'foam.lang.FObject',
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'put_',
      javaCode: `
      PM pm = PM.create(x, this.getClass().getSimpleName(), "put");
      SAFEntry entry = (SAFEntry) obj;

      try {
        DAO dao = ((DAO) x.get(entry.getCSpecName()));
        DAO mdao = (DAO) dao.cmd_(x, foam.dao.DAO.LAST_CMD);

        if ( DOP.PUT == entry.getDop() ) {
          FObject nu = entry.getObject();
          nu = mdao.put_(x, nu);
        } else {
          throw new UnsupportedOperationException(entry.getDop().toString());
        }

        return entry;
      } catch (Throwable t) {
        pm.error(x, entry, t);
        Loggers.logger(x, this).error("put", entry, t.getMessage(), t);
        throw t;
      } finally {
        pm.log(x);
      }
      `
    }
  ]
});
