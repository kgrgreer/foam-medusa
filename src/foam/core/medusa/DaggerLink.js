/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.medusa',
  name: 'DaggerLink',

  documentation: `Each medusa entry has a unique index and hash. This interface captures that pairing.`,

  properties: [
    {
      name: 'index',
      class: 'Long'
    },
    {
      name: 'hash',
      class: 'String'
    }
  ]
});
