foam.POM({
  name:'mm',
  tasks: [ // copy to application mm pom
    function setRunArgs() {
      // configure instance as mediator
      RUN_ARGS += ` -m`;
      this.SUPER();
    }
  ],
  projects: [
    { name: '../m/pom' }
  ]
});
