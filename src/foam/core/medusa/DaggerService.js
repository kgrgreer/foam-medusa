/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.medusa',
  name: 'DaggerService',

  documentation: `Directed Acyclic Graph (DAG) service which manages indexes and hashes for the Medusa block chain.`,

  methods: [
    {
      documentation: 'Request DaggerService to reset/reconfigure itself based on the supplied DaggerBootstrap',
      name: 'reconfigure',
      args: 'Context x, foam.core.medusa.DaggerBootstrap bootstrap',
      type: 'foam.core.medusa.DaggerBootstrap'
    },
    {
      documentation: `Initial hash to prime the system.`,
      name: 'getBootstrapHash',
      args: 'Context x, int index',
      type: 'String'
    },
    {
      documentation: `Return the next available index and the two index/hash pairs used to calculate the next index hash.`,
      name: 'getNextLinks',
      args: 'Context x',
      type: 'foam.core.medusa.DaggerLinks'
    },
    {
      documentation: `Inform the DAG service that this link is available for hashing against.`,
      name: 'updateLinks',
      synchronized: true,
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'link',
          type: 'foam.core.medusa.DaggerLink'
        }
      ]
    },
    {
      documentation: `Generate a link in the DAG for a medusa entry.`,
      name: 'link',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'entry',
          type: 'foam.core.medusa.MedusaEntry'
        }
      ],
      type: 'foam.core.medusa.MedusaEntry'
    },
    {
      documentation: `Calculate the hash of a medusa entry.`,
      name: 'hash',
      type: 'foam.core.medusa.MedusaEntry',
      javaThrows: ['java.security.NoSuchAlgorithmException'],
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'entry',
          type: 'foam.core.medusa.MedusaEntry'
        }
      ]
    },
    {
      documentation: `Verify the hash of a medusa entry`,
      name: 'verify',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'entry',
          type: 'foam.core.medusa.MedusaEntry'
        }
      ]
    },
    {
      documentation: `Sign a medusa entry`,
      name: 'sign',
      type: 'String',
      javaThrows: ['java.security.DigestException',
                    'java.security.NoSuchAlgorithmException'],
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'entry',
          type: 'foam.core.medusa.MedusaEntry'
        }
      ]
    },
    {
      documentation: `Update the next available index.`,
      name: 'setGlobalIndex',
      synchronized: true,
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'index',
          type: 'Long'
        }
      ],
      type: 'Long'
    },
    {
      documentation: `Retrieve the current global index.`,
      name: 'getGlobalIndex',
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ],
      type: 'Long'
    },
    {
      documentation: `Retrieve the next available global index.`,
      name: 'getNextGlobalIndex',
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ],
      type: 'Long'
    },
    {
      documentation: 'Indexes with values equal to or less than minIndex are involved in bootstrapping and should not be deleted.',
      name: 'getMinIndex',
      type: 'Long'
    },
  ]
});
