/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa.saf',
  name: 'SAFMedusaClientDAO',
  extends: 'foam.core.saf.SAFClientDAO',

  javaImports: [
    'foam.core.medusa.ClusterConfig',
    'foam.core.medusa.ClusterConfigSupport',
    'foam.core.pm.PM',
    'foam.core.saf.SAFEntry',
    'foam.core.saf.SAFManager', // resolve compilation failure
    'foam.dao.DAO',
    'foam.lang.FObject',
    'foam.lang.X'
  ],

  properties: [
    {
      name: 'myConfig',
      class: 'FObjectProperty',
      of: 'foam.core.medusa.ClusterConfig',
      javaSetter: `
      myConfig_ = val;
      myConfigIsSet_ = true;
      DELEGATE.clear(this);
      `
    },
    {
      name: 'toConfig',
      class: 'FObjectProperty',
      of: 'foam.core.medusa.ClusterConfig',
      javaSetter: `
      toConfig_ = val;
      toConfigIsSet_ = true;
      DELEGATE.clear(this);
      `
    },
    {
      class: 'Proxy',
      of: 'foam.dao.DAO',
      name: 'delegate',
      transient: true,
      javaFactory: `
      ClusterConfigSupport support = (ClusterConfigSupport) getX().get("clusterConfigSupport");
      DAO dao = support.getBroadcastClientDAO(getX(), getServiceName(), getMyConfig(), getToConfig());
      return dao;
      `
    }
  ],

  methods: [
    {
      name: 'submit',
      args: 'X x, SAFEntry entry',
      javaCode: `
      PM pm = new PM("SAFMedusaClientDAO", "submit", getMyConfig().getId(), getToConfig().getId());
      try {
        getDelegate().put(entry);
      } catch (RuntimeException e) {
        pm.error(x, e);
        throw e;
      } finally {
        pm.log(x);
      }
      `
    }
  ]
});
