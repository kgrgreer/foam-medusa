/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'MedusaEntryRefinement',
  refines: 'foam.core.medusa.MedusaEntry',
  implements: [
    'foam.core.medusa.DaggerLink'
  ],

  documentation: 'Additional implementation seperated out to allow a minimal core build without all of Medusa'
})
