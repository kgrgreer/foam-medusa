/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa.benchmark',
  name: 'DaggerLinkBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.core.bench.Benchmark',
    'foam.core.logger.PrefixLogger',
    'foam.core.logger.Logger',
    'foam.core.logger.StdoutLogger',
    'foam.core.medusa.MedusaEntry',
    'foam.core.medusa.DaggerService',
    'foam.core.medusa.test.MedusaTestObject'
  ],

  properties: [
    {
      name: 'sampleSize',
      type: 'Int',
      value: 1000,
    },
    {
      name: 'logger',
      class: 'FObjectProperty',
      of: 'foam.core.logger.Logger',
      visibility: 'HIDDEN',
      transient: true,
      javaCloneProperty: '//noop',
      javaFactory: `
      Logger logger = (Logger) getX().get("logger");
      if ( logger == null ) {
        logger = StdoutLogger.instance();
      }
      return new PrefixLogger(new Object[] {
        this.getClass().getSimpleName()
      }, logger);
      `
    }
  ],

  methods: [
    {
      name: 'execute',
      args: 'Context x',
      javaCode: `
      DaggerService dagger = (DaggerService) x.get("daggerService");
      dagger.link(x, x.create(MedusaEntry.class));
      `
    }
  ]
});
