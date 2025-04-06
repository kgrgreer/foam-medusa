/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.security',
  name: 'DigestFObjectParser',
  extends: 'foam.lib.parse.ProxyParser',

  javaImports: [
    'foam.lib.json.FObjectParser',
    'foam.lib.parse.*',
    'org.bouncycastle.util.encoders.Hex',
    'java.nio.charset.StandardCharsets'
  ],

  properties: [
    {
      name: 'messageDigest',
      class: 'FObjectProperty',
      of: 'foam.core.security.MessageDigest'
    },
    {
      name: 'parserFObject',
      class: 'FObjectProperty',
      of: 'foam.lib.parse.Parser',
    },
    {
      name: 'parserDigest',
      class: 'FObjectProperty',
      of: 'foam.lib.parse.Parser',
    }
  ],

  javaCode: `
  public DigestFObjectParser(MessageDigest messageDigest, Class defaultClass) {
    setMessageDigest(messageDigest);
    setParserFObject(FObjectParser.create(defaultClass));
    setParserDigest(new Seq1(1,
      new Optional(Literal.create(",")),
      FObjectParser.create(foam.core.security.MessageDigest.class)));
  }
  `,

  methods: [
    {
      name: 'parse',
      javaCode: `
        // parse FObject returning null upon error
        PStream ps1 = ps.apply(getParserFObject(), x);
        if ( ps1 == null || ps1.value() == null ) {
          return null;
        }

        // get journal entry as a string
        String message = ps.substring(ps1);

        // parse message digest
        PStream ps2 = ps1.apply(getParserDigest(), x);

        if ( ps2 == null ) {
          throw new RuntimeException("Digest not found");
        }

        getMessageDigest().setPreviousDigest(getMessageDigest().verify(message, (MessageDigest) ps2.value()));

        return ps.setValue(ps1.value());
      `
    }
  ]
})

/*
public class HashedFObjectParser
  extends ProxyParser
{
  public HashedFObjectParser(final MessageDigest messageDigest, final boolean digestRequired) {
    this(messageDigest, null, digestRequired);
  }

  public HashedFObjectParser(final MessageDigest messageDigest, final Class defaultClass, final boolean digestRequired) {
    setDelegate(new Parser() {
      private Parser parser1 = FObjectParser.create(defaultClass);
      private Parser parser2 = new Seq1(1,
        new Optional(Literal.create(",")),
        FObjectParser.create(net.nanopay.security.MessageDigest.class));

      @Override
      public PStream parse(PStream ps, ParserContext x) {
        // parse FObject returning null upon error
        PStream ps1 = ps.apply(parser1, x);
        if ( ps1 == null || ps1.value() == null ) {
          return null;
        }

        // get journal entry as a string
        String message = ps.substring(ps1);

        // parse message digest
        PStream ps2 = ps1.apply(parser2, x);

        if ( digestRequired ) {
          if ( ps2 == null ) {
            throw new RuntimeException("Digest not found");
          }

          messageDigest.setPreviousDigest(messageDigest.verify(message, (MessageDigest) ps2.value()));
        }

        return ps.setValue(ps1.value());
      }
    });
  }
}
*/
