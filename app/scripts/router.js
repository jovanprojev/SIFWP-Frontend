MyApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'notificationController'
  });

  $routeProvider.when('/add', {
    templateUrl: 'views/add.html',
    controller:'addController'
 
  });

  $routeProvider.when('/edit/:id', {
    templateUrl: 'views/add.html',
    controller:'putController'

  });

  $routeProvider.when('/404', {
    templateUrl: '404.html'
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);
