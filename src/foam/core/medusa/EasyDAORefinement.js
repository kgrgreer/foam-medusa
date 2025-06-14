/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'EasyDAORefinement',
  refines: 'foam.dao.EasyDAO',

  properties: [
    {
      name: 'cluster',
      value: true
    }
  ],

  methods: [
    {
      name: 'getClusterDelegate',
      args: 'foam.dao.DAO delegate',
      type: 'foam.dao.DAO',
      javaCode: `
        if ( getMdao() != null ) {
          if ( getSAF() ) {
            return new foam.core.medusa.sf.SFBroadcastDAO.Builder(getX())
            .setCSpec(getCSpec())
            .setDelegate(delegate)
            .build();
          }
          if ( getCluster() ) {
            return new foam.core.medusa.MedusaAdapterDAO.Builder(getX())
              .setCSpec(getCSpec())
              .setDelegate(delegate)
              .build();
          }
        }
        return delegate;
      `
    }
  ]
});
