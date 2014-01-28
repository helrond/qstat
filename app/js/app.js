'use strict';


// Declare app level module which depends on filters, and services
angular.module('qStat', [
  'ngRoute',
  'qStat.filters',
  'qStat.services',
  'qStat.directives',
  'qStat.controllers'
]).
config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider.
        when('/', {templateUrl: 'partials/home.html', controller: 'homeCtrl'})
  .when('/games', {templateUrl: 'partials/games/list.html', controller: 'gameCtrl'})
  .when('/games/:gameId', {templateUrl: 'partials/games/detail.html', controller: 'gameDetailCtrl'})
  .when('/teams', {templateUrl: 'partials/teams/list.html', controller: 'teamCtrl'})
  .when('/teams/:id', {templateUrl: 'partials/teams/detail.html', controller: 'teamDetailCtrl'})
  .when('/players', {templateUrl: 'partials/players/list.html', controller: 'playerCtrl'})
  .when('/players/:playerId', {templateUrl: 'partials/players/detail.html', controller: 'playerDetailCtrl'})
  .when('/stats/select', {templateUrl: 'partials/stats/gameSelect.html', controller: 'statsCtrl'})
  .when('/stats/start', {templateUrl: 'partials/stats/gameStart.html', controller: 'statsCtrl'})
  .when('/stats/record', {templateUrl: 'partials/stats/record.html', controller: 'statsCtrl'})
  .otherwise({redirectTo: '/'});
}]);
