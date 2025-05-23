/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.medusa',
  name: 'ClusterConfig',

  documentation: 'Cluster node meta data used to group nodes and describe features.',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.CreatedByAware',
    'foam.core.auth.EnabledAware',
    'foam.core.auth.LastModifiedAware',
    'foam.core.auth.LastModifiedByAware'
  ],

  imports: [
    'userDAO',
  ],

  tableColumns: [
    'id',
    'name',
    'enabled',
    'status',
    'type',
    'isPrimary',
    'accessMode',
    'port',
    'zone',
    'region',
    'regionStatus',
    'realm',
    'lastModified'
  ],

  properties: [
    {
      documentation: 'Local network IP or DNS name, or id to look up in HostDAO',
      name: 'id',
      class: 'String',
      label: 'Hostname',
      required: true,
      tableWidth: 250,
    },
    {
      documentation: 'External DNS name, or name instance is known by. Used in log messages.',
      name: 'name',
      class: 'String',
      required: true,
      tableWidth: 150,
    },
    {
      class: 'Boolean',
      name: 'enabled',
      documentation: 'Allows for prepatory configuration changes.',
      value: true
    },
    {
      documentation: 'Group of nodes. Encompases all nodes in all Regions for the same application.',
      name: 'realm',
      class: 'String',
      required: 'true',
    },
    {
      documentation: 'Geographic region, like a Data Center, of group nodes. A sub group in the Realm.',
      name: 'region',
      class: 'String',
    },
    {
      documentation: 'region status.',
      name: 'regionStatus',
      class: 'Enum',
      of: 'foam.core.medusa.RegionStatus',
      value: 'STANDBY'
    },
    {
      documentation: 'A sub-group of nodes in a region. An inner core of nodes in a Data Center.  0 (zero) has special meaning for Medusa Mediator clusters.',
      name: 'zone',
      class: 'Long',
      value: 0
    },
    {
      documentation: 'A server hosting company proprietary name or id which designates an instance to a some availability area. AWS calls them Availability Zones, while Azure Availablitly Sets or Regions',
      name: 'availabilityId',
      class: 'String'
    },
    {
      documentation: 'Override random bucket assignment (1-indexed, 0 indicates auto bucket assignment).',
      name: 'bucket',
      class: 'Int'
    },
    {
      documentation: 'Type of a Medusa instance.',
      name: 'type',
      class: 'Enum',
      of: 'foam.core.medusa.MedusaType',
      value: 'MEDIATOR'
    },
    {
      documentation: 'Status of a node',
      name: 'status',
      class: 'Enum',
      of: 'foam.core.medusa.Status',
      value: 'OFFLINE',
      storageTransient: true
    },
    {
      documentation: 'Mode of a node (read-only, read-write or write-only)',
      name: 'accessMode',
      class: 'Enum',
      of: 'foam.core.medusa.AccessMode',
      value: 'RW'
    },
    {
      name: 'port',
      class: 'Int'
    },
    {
      name: 'sessionId',
      class: 'String'
    },
    {
      documentation: 'True when this instance is the Primary.',
      name: 'isPrimary',
      class: 'Boolean',
      value: false,
      visibility: 'RO',
      storageTransient: true
    },
    {
      name: 'errorMessage',
      class: 'String',
      visibility: 'RO',
      storageTransient: true
    },
    {
      name: 'location',
      class: 'String'
    },
    {
      documentation: 'used by info web agent for external monitoring',
      name: 'replayingInfo',
      class: 'FObjectProperty',
      of: 'foam.core.medusa.ReplayingInfo',
      storageTransient: true
    },
    {
      documentation: 'Creation date.',
      name: 'created',
      class: 'DateTime',
      visibility: 'RO',
      storageOptional: true
    },
    {
      documentation: `The id of the user who created the transaction.`,
      name: 'createdBy',
      class: 'Reference',
      of: 'foam.core.auth.User',
      visibility: 'RO',
      storageOptional: true,
      projectionSafe: false,
      tableCellFormatter: function(value, obj) {
        obj.userDAO.find(value).then(function(user) {
          if ( user ) {
            if ( user.email ) {
              this.add(user.email);
            }
          }
        }.bind(this));
      }
    },
    {
      documentation: 'User who created the entry',
      name: 'createdByAgent',
      class: 'Reference',
      of: 'foam.core.auth.User',
      visibility: 'RO',
      storageOptional: true,
      projectionSafe: false,
      tableCellFormatter: function(value, obj) {
        obj.userDAO.find(value).then(function(user) {
          if ( user ) {
            if ( user.email ) {
              this.add(user.email);
            }
          }
        }.bind(this));
      }
    },
    {
      documentation: 'Last modified date.',
      name: 'lastModified',
      class: 'DateTime',
      visibility: 'RO',
      tableWidth: 150,
      storageOptional: true,
      javaCompare: 'return 0;'
    },
    {
      documentation: `The id of the user who created the transaction.`,
      name: 'lastModifiedBy',
      class: 'Reference',
      of: 'foam.core.auth.User',
      visibility: 'RO',
      storageOptional: true,
      javaCompare: 'return 0;',
      projectionSafe: false,
      tableCellFormatter: function(value, obj) {
        obj.userDAO.find(value).then(function(user) {
          if ( user ) {
            if ( user.email ) {
              this.add(user.email);
            }
          }
        }.bind(this));
      }
    },
    {
      name: 'lastModifiedByAgent',
      class: 'Reference',
      of: 'foam.core.auth.User',
      visibility: 'RO',
      storageOptional: true,
      javaCompare: 'return 0;',
      projectionSafe: false,
      tableCellFormatter: function(value, obj) {
        obj.userDAO.find(value).then(function(user) {
          if ( user ) {
            if ( user.email ) {
              this.add(user.email);
            }
          }
        }.bind(this));
      }
    }
  ]
});
