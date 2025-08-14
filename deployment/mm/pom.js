foam.POM({
  name:'mm',
  projects: [
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
