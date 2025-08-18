foam.POM({
  name:'mm',
  projects: [
    { name: "../../../foam-saf/pom" },
    { name: '../m/pom' }
  ],
  files: [
    { name: "../../src/foam/core/medusa/EasyDAORefinement",      flags: "js|java" }
  ],
  tasks: [
    function setRunArgs() {
      RUN_ARGS += ' -m';
    }
  ]
});
