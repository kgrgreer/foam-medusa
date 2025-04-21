foam.POM({
  name:'mm',
  projects: [
    { name: '../m/pom' }
  ],
  tasks: [
    function setRunArgs() {
      RUN_ARGS += ' -m';
    }
  ]
});
