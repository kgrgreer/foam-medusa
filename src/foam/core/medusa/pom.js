foam.POM({
  name: "medusa",
  projects: [
    { name: "test/pom"},
  ],
  files: [
    { name: "AccessMode",
      flags: "js|java" },
    { name: "AnnouncePrimaryDAO",
      flags: "js|java" },
    { name: "BlockingDAO",
      flags: "js|java" },
    { name: "ClearSink",
      flags: "js|java" },
    { name: "ClientElectoralService",
      flags: "js|java" },
    { name: "ClusterableDummy",
      flags: "js|java" },
    { name: "ClusterConfig",
      flags: "js|java" },
    { name: "ClusterConfigMonitor",
      flags: "js|java" },
    { name: "ClusterConfigMonitorAgent",
      flags: "js|java" },
    { name: "ClusterConfigNARegionReplayDAO",
      flags: "js|java" },
    { name: "ClusterConfigReplayDAO",
      flags: "js|java" },
    { name: "ClusterConfigStatusDAO",
      flags: "js|java" },
    { name: "ClusterConfigSupport",
      flags: "js|java" },
    { name: "ClusterConfigSupportDAO",
      flags: "js|java" },
    { name: "ClusterException",
      flags: "js|java" },
    { name: "ClusterTopology",
      flags: "js" },
    { name: "ClusterTopologyView",
      flags: "js" },
    { name: "Compaction",
      flags: "js|java" },
    { name: "CompactionException",
      flags: "js|java" },
    { name: "CompactionDAO",
      flags: "js|java" },
    { name: "CompactionSink",
      flags: "js|java" },
    { name: "DaggerBootstrap",
      flags: "js|java" },
    { name: "DaggerBootstrapDAO",
      flags: "js|java" },
    { name: "DaggerException",
      flags: "js|java" },
    { name: "DaggerService",
      flags: "js|java" },
    { name: "DaggerLink",
      flags: "js|java" },
    { name: "DaggerLinks",
      flags: "js|java" },
    { name: "DefaultDaggerService",
      flags: "js|java" },
    { name: "EasyDAORefinement",
      flags: "js|java" },
    { name: "ElectoralService",
      flags: "js|java" },
    { name: "ElectoralServiceState",
      flags: "js|java" },
    { name: "ElectoralServiceServer",
      flags: "js|java" },
    { name: "LoadingAgent",
      flags: "js|java" },
    { name: "Clusterable",
      flags: "js|java" },
    { name: "MedusaEntry",
      flags: "js|java" },
    { name: "MedusaEntryRefinement",
      flags: "js|java" },
    { name: "MedusaEntryNoRemoveDAO",
      flags: "js|java" },
    { name: "MedusaEntryPurgeCmd",
      flags: "js|java" },
    { name: "MedusaEntrySupport",
      flags: "js|java" },
    { name: "MedusaEntryTimeoutException",
      flags: "js|java" },
    { name: "MedusaException",
      flags: "js|java" },
    { name: "MedusaHealth",
      flags: "js|java" },
    { name: "MedusaHealthCitationView",
      flags: "js" },
    { name: "MedusaHealthFactory",
      flags: "js|java" },
    { name: "MedusaHealthHeartbeatService",
      flags: "js|java" },
    { name: "MedusaHealthStatusDAO",
      flags: "js|java" },
    { name: "MedusaAdapterDAO",
      flags: "js|java" },
    { name: "MedusaBroadcastDAO",
      flags: "js|java" },
    { name: "MedusaBroadcastNARegionDAO",
      flags: "js|java" },
    { name: "MedusaBroadcastNARegionNodesDAO",
      flags: "js|java" },
    { name: "MedusaBroadcast2NodesDAO",
      flags: "js|java" },
    { name: "MedusaConsensusDAO",
      flags: "js|java" },
    { name: "MedusaConsensusMonitor",
      flags: "js|java" },
    { name: "MedusaCronScheduler",
      flags: "js|java" },
    { name: "MedusaEmailFolderAgent",
      flags: "js|java" },
    { name: "MedusaHashingDAO",
      flags: "js|java" },
    { name: "MedusaInternalDAO",
      flags: "js|java" },
    { name: "MedusaMessage",
      flags: "js|java" },
    { name: "MedusaNodeJDAO",
      flags: "js|java" },
    { name: "MedusaRegistry",
      flags: "js|java" },
    { name: "MedusaRegistryService",
      flags: "js|java" },
    { name: "MedusaNOPRegistryService",
      flags: "js|java" },
    { name: "MedusaSigningDAO",
      flags: "js|java" },
    { name: "MedusaSetNodeDAO",
      flags: "js|java" },
    { name: "MedusaSMTPAgent",
      flags: "js|java" },
    { name: "MedusaStatusWatcher",
      flags: "js|java" },
    { name: "MedusaSupport",
      flags: "js|java" },
    { name: "MedusaSupportRefinement",
      flags: "js|java" },
    { name: "MedusaTestingDAO",
      flags: "js|java" },
    { name: "MedusaType",
      flags: "js|java" },
    { name: "MedusaUniqueDAO",
      flags: "js|java" },
    { name: "MultiplePrimariesException",
      flags: "js|java" },
    { name: "NodeCView",
      flags: "js" },
    { name: "CSpecLookup",
      flags: "js|java" },
    { name: "PredicatedPutDAO",
      flags: "js|java" },
    { name: "PrimaryMediatorDAO",
      flags: "js|java" },
    { name: "PrimaryNotFoundException",
      flags: "js|java" },
    { name: "PromotedClearAgent",
      flags: "js|java" },
    { name: "PromotedPurgeAgent",
      flags: "js|java" },
    { name: "PurgeSink",
      flags: "js|java" },
    { name: "RegionCView",
      flags: "js" },
    { name: "RegionStatus",
      flags: "js|java" },
    { name: "RenouncePrimaryDAO",
      flags: "js|java" },
    { name: "ReplayCmd",
      flags: "js|java" },
    { name: "ReplayCompleteCmd",
      flags: "js|java" },
    { name: "ReplayDetailsCmd",
      flags: "js|java" },
    { name: "ReplayMediatorDAO",
      flags: "js|java" },
    { name: "ReplayNodeDAO",
      flags: "js|java" },
    { name: "ReplayRequestCmd",
      flags: "js|java" },
    { name: "ReplayingDAO",
      flags: "js|java" },
    { name: "ReplayingInfo",
      flags: "js|java" },
    { name: "ReplayingInfoDAO",
      flags: "js|java" },
    { name: "ReplayingInfoCView",
      flags: "js" },
    { name: "ReplayingInfoDetailCView",
      flags: "js" },
    { name: "RetryClientSinkDAO",
      flags: "js|java" },
    { name: "SecondaryMediatorDAO",
      flags: "js|java" },
    { name: "SetNodeSink",
      flags: "js|java" },
    { name: "Status",
      flags: "js|java" },
    { name: "TimeoutDAO",
      flags: "js|java" },
    { name: "ZoneCView",
      flags: "js" },
    { name: "benchmark/DaggerLinkBenchmark",
      flags: "js|java" },
    { name: "benchmark/DaggerVerifyBenchmark",
      flags: "js|java" },
    { name: "benchmark/MedusaPingBenchmark",
      flags: "js|java" },
    { name: "benchmark/MedusaTestBenchmark",
      flags: "js|java" },
    { name: "benchmark/MedusaCUTestBenchmark",
      flags: "js|java" },
    { name: "benchmark/PingCmd",
      flags: "js|java" },
    { name: "benchmark/PingDAO",
      flags: "js|java" },
    { name: "sf/MedusaSFManager",
      flags: "js|java" },
    { name: "sf/SFBroadcastDAO",
      flags: "js|java" },
    { name: "sf/SFBroadcastReceiverDAO",
      flags: "js|java" },
    { name: "sf/SFMedusaClientDAO",
      flags: "js|java" },
    { name: "test/MedusaEntryParseFormatTest",
      flags: "js|java" },
    { name: "test/MedusaTestObject",
      flags: "js|java" },
    { name: "test/MedusaTestObjectCompactionSink",
      flags: "js|java" },
    { name: "test/MedusaTestObjectNested",
      flags: "js|java" },
    { name: "test/MedusaTestObjectDIGBenchmark",
      flags: "js|java" },
    { name: "test/MedusaTestObjectDistributedDIGBenchmarkRunner",
      flags: "js|java" }
  ]
});
