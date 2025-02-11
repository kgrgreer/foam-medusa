/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'ClientElectoralService',
  implements: [ 'foam.core.medusa.ElectoralService' ],
  
  properties: [
    {
      class: 'Stub',
      name: 'delegate',
      of: 'foam.core.medusa.ElectoralService'
    }
  ]
});
  
