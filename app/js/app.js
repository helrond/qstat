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
  $routeProvider.when('/games', {templateUrl: 'partials/games/list.html', controller: 'gameCtrl'});
  $routeProvider.when('/games/:id', {templateUrl: 'partials/games/detail.html', controller: 'gameDetailCtrl'});
  $routeProvider.when('/teams', {templateUrl: 'partials/teams/list.html', controller: 'teamCtrl'});
  $routeProvider.when('/teams/:id', {templateUrl: 'partials/teams/detail.html', controller: 'teamDetailCtrl'});
  $routeProvider.when('/players', {templateUrl: 'partials/players/list.html', controller: 'playerCtrl'});
  $routeProvider.when('/players/:id', {templateUrl: 'partials/players/detail.html', controller: 'playerDetailCtrl'});
  $routeProvider.when('/stats/select', {templateUrl: 'partials/stats/gameSelect.html', controller: 'statsCtrl'});
  $routeProvider.when('/stats/start', {templateUrl: 'partials/stats/gameStart.html', controller: 'statsCtrl'});
  $routeProvider.when('/stats/record', {templateUrl: 'partials/stats/record.html', controller: 'statsCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
