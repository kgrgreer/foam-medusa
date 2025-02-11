/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.box.sf',
  name: 'SFEntry',
  extends: 'foam.core.medusa.MedusaEntry',

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.lang.FObject',
      name: 'object',
      storageTransient: false
    },
    {
      class: 'Long',
      name: 'scheduledTime',
      storageTransient: true,
      clusterTransient: true,
      value: 0
    },
    {
      class: 'FObjectProperty',
      of: 'foam.box.sf.SF',
      name: 'sf',
      storageTransient: true,
      clusterTransient: true,
    },
    {
      name: 'retryStrategy',
      class: 'FObjectProperty',
      of: 'foam.util.retry.RetryStrategy',
      storageTransient: true,
      clusterTransient: true,
    },
  ]
})