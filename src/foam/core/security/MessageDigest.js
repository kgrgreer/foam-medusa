/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.security',
  name: 'MessageDigest',

  documentation: `MessageDigest, a wrapper around Java's MessageDigest.
This model is an integral part of DigestJournal, managing the
per record hash (chain) based on previous messages.`,

  javaImports: [
    'foam.core.logger.Loggers',
    'foam.util.SafetyUtil',
    'org.bouncycastle.util.encoders.Hex',
    'org.bouncycastle.jce.provider.BouncyCastleProvider',
    'java.nio.charset.StandardCharsets',
    'java.security.Security',
    'java.util.Arrays',
    'java.util.concurrent.locks.ReentrantLock'
  ],

  properties: [
    {
      documentation: 'Hashing algorithm',
      name: 'algorithm',
      class: 'String',
      value: 'SHA-256'
    },
    {
      documentation: 'Current digest suitable for json serialization',
      name: 'digest',
      class: 'String',
      visibility: 'RO'
    },
    {
      documentation: 'Previous digest for rolling',
      name: 'previousDigest',
      class: 'Object',
      visibility: 'HIDDEN',
      transient: true
    },
    {
      documentation: 'Java MessageDigest instance',
      name: 'instance',
      class: 'Object',
      javaFactory: `
      try {
        return java.security.MessageDigest.getInstance(getAlgorithm());
      } catch ( java.security.NoSuchAlgorithmException e ) {
        throw new RuntimeException(e.getMessage(), e);
      }
      `,
      visibility: 'HIDDEN',
      transient: true
    }
  ],

  javaCode: `
    static {
      BouncyCastleProvider provider = new BouncyCastleProvider();
      if ( Security.getProvider(provider.getName()) == null ) {
        Security.addProvider(provider);
      }
    }
  `,
  
  methods: [
    {
      name: 'update',
      args: 'String message',
      javaCode: `
      java.security.MessageDigest md = (java.security.MessageDigest) getInstance();
      md.update(message.getBytes(StandardCharsets.UTF_8));
      `
    },
    {
      name: 'roll',
      javaCode: `
      java.security.MessageDigest md = (java.security.MessageDigest) getInstance();
      byte[] digest = md.digest();
      if ( getPreviousDigest() != null ) {
        md.update((byte[]) getPreviousDigest());
        md.update(digest);
        digest = md.digest();
      }
      setDigest(Hex.toHexString(digest));
      setPreviousDigest(digest);
      `
    },
    {
      name: 'reset',
      documentation: 'Reset hashing chain, used for journal reset.',
      javaCode: `
      java.security.MessageDigest md = (java.security.MessageDigest) getInstance();
      md.reset();
      clearDigest();
      clearPreviousDigest();
      `
    },
    {
      name: 'verify',
      args: 'String message, MessageDigest messageDigest',
      type: 'byte[]',
      javaCode: `
      java.security.MessageDigest md = (java.security.MessageDigest) getInstance();
      md.update(message.getBytes(StandardCharsets.UTF_8));
      byte[] digest = md.digest();
      if ( getPreviousDigest() != null ) {
        md.update((byte[]) getPreviousDigest());
        md.update(digest);
        digest = md.digest();
      }
      if ( ! Hex.toHexString(digest).equals(messageDigest.getDigest()) ) {
        Loggers.logger(getX(), this).error("Digest verification failed.", messageDigest.getDigest(), Hex.toHexString(digest));
        throw new DigestVerificationException();
      }
      return digest;
      `
    },
    {
      documentation: 'return self after preparing digest with current md.digest',
      name: 'get',
      type: 'foam.core.security.MessageDigest',
      javaCode: `
      roll();
      return this;
      `
    }
  ]
})
