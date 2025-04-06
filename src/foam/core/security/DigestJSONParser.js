/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.security',
  name: 'DigestJSONParser',
  extends: 'foam.lib.json.JSONParser',

  javaImports: [
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.lib.parse.Parser',
    'foam.lib.parse.ParserContext',
    'foam.lib.parse.ParserContextImpl',
    'foam.lib.parse.StringPStream',
  ],

  properties: [
    {
      name: 'messageDigest',
      class: 'FObjectProperty',
      of: 'foam.core.security.MessageDigest'
    }
  ],

  javaCode: `
    public FObject parseString(String data, Class defaultClass) {
      StringPStream ps = new StringPStream(data);
      ParserContext x = new ParserContextImpl();
      x.set("X", getX());

      ps = (StringPStream) ps.apply(new DigestFObjectParser(getMessageDigest(), defaultClass), x);

      return ps == null ? null : (FObject) ps.value();
    }
  `
});
