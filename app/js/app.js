'use strict';


// Declare app level module which depends on filters, and services
angular.module('qStat', [
  'ngRoute',
  'qStat.filters',
  'qStat.services',
  'qStat.directives',
  'qStat.controllers',
  'xeditable'
]).
config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider.
        when('/', {templateUrl: 'partials/home.html', controller: 'homeCtrl'})
  .when('/games', {templateUrl: 'partials/games/list.html', controller: 'gameCtrl'})
  .when('/games/new', {templateUrl: 'partials/games/detail.html', controller: 'gameDetailCtrl'})
  .when('/games/:gameId', {templateUrl: 'partials/games/detail.html', controller: 'gameDetailCtrl'})
  .when('/games/:gameId/edit', {templateUrl: 'partials/games/edit.html', controller: 'gameDetailCtrl'})
  .when('/teams', {templateUrl: 'partials/teams/list.html', controller: 'teamCtrl'})
  .when('/teams/new', {templateUrl: 'partials/teams/detail.html', controller: 'teamDetailCtrl'})
  .when('/teams/:teamId', {templateUrl: 'partials/teams/detail.html', controller: 'teamDetailCtrl'})
  .when('/teams/:teamId/edit', {templateUrl: 'partials/teams/edit.html', controller: 'teamDetailCtrl'})
  .when('/players', {templateUrl: 'partials/players/list.html', controller: 'playerCtrl'})
  .when('/players/new', {templateUrl: 'partials/players/detail.html', controller: 'playerDetailCtrl'})
  .when('/players/:playerId', {templateUrl: 'partials/players/detail.html', controller: 'playerDetailCtrl'})
  .when('/players/:playerId/edit', {templateUrl: 'partials/players/edit.html', controller: 'playerDetailCtrl'})
  .when('/stats/select', {templateUrl: 'partials/stats/gameSelect.html', controller: 'statsCtrl'})
  .when('/stats/start', {templateUrl: 'partials/stats/gameStart.html', controller: 'statsCtrl'})
  .when('/stats/record', {templateUrl: 'partials/stats/record.html', controller: 'statsCtrl'})
  .otherwise({redirectTo: '/'});
}])
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});;
