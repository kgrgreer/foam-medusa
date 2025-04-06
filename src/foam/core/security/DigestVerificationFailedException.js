/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  name: 'DigestVerificationException',
  package: 'foam.core.security',
  javaExtends: 'foam.lang.FOAMException',

  javaCode: `
    public DigestVerificationException(String message) {
      super(message);
    }

    public DigestVerificationException(Throwable cause) {
      super(cause.getMessage(), cause);
    }

    public DigestVerificationException(String message, Throwable cause) {
      super(message, cause);
    }
  `
});
