/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  name: 'ClusterNotPrimaryException',
  package: 'foam.core.medusa',
  javaExtends: 'foam.core.medusa.ClusterException',

  javaCode: `
    public ClusterNotPrimaryException(String message) {
      super(message);
    }

    public ClusterNotPrimaryException(String message, Throwable cause) {
      super(message, cause);
    }
  `
});
