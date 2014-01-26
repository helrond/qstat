'use strict';


// Declare app level module which depends on filters, and services
angular.module('qStat', [
  'ngRoute',
  'qStat.filters',
  'qStat.services',
  'qStat.directives',
  'qStat.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'homeCtrl'});
  $routeProvider.when('/games', {templateUrl: 'partials/games/view.html', controller: 'gameCtrl'});
  $routeProvider.when('/games/view', {templateUrl: 'partials/games/view.html', controller: 'gameCtrl'});
  $routeProvider.when('/games/edit', {templateUrl: 'partials/games/edit.html', controller: 'gameCtrl'});
  $routeProvider.when('/teams', {templateUrl: 'partials/teams/view.html', controller: 'teamCtrl'});
  $routeProvider.when('/teams/view', {templateUrl: 'partials/teams/view.html', controller: 'teamCtrl'});
  $routeProvider.when('/teams/edit', {templateUrl: 'partials/teams/edit.html', controller: 'teamCtrl'});
  $routeProvider.when('/players', {templateUrl: 'partials/players/view.html', controller: 'playerCtrl'});
  $routeProvider.when('/players/view', {templateUrl: 'partials/players/view.html', controller: 'playerCtrl'});
  $routeProvider.when('/players/edit', {templateUrl: 'partials/players/edit.html', controller: 'playerCtrl'});
  $routeProvider.when('/stats/select', {templateUrl: 'partials/stats/gameSelect.html', controller: 'statsCtrl'});
  $routeProvider.when('/stats/start', {templateUrl: 'partials/stats/gameStart.html', controller: 'statsCtrl'});
  $routeProvider.when('/stats/record', {templateUrl: 'partials/stats/record.html', controller: 'statsCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
