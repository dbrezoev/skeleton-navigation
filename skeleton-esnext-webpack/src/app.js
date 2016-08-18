export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      { route: 'assign-test',  name: 'assign-test', moduleId: './area/assign/assign-test', nav: true, title: 'Assign Tests' },
      { route: 'date-time-test',  name: 'date-time', moduleId: './area/date-time/date-time-test', nav: true, title: 'Date and time Tests' }
    ]);

    this.router = router;
  }
}
