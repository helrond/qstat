'use strict';


// Declare app level module which depends on filters, and services
angular.module('qStat',[
'ngRoute',
'qStat.filters',
'qStat.services',
'qStat.directives',
'qStat.controllers',
'xeditable']).
config([ '$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/home.html', controller: 'homeCtrl'
    }).when('/games', {
        templateUrl: 'partials/games/list.html', controller: 'gameCtrl'
    }).when('/games/new', {
        templateUrl: 'partials/games/detail.html', controller: 'gameDetailCtrl'
    }).when('/games/:gameId', {
        templateUrl: 'partials/games/detail.html', controller: 'gameDetailCtrl'
    }).when('/teams', {
        templateUrl: 'partials/teams/list.html', controller: 'teamCtrl'
    }).when('/teams/new', {
        templateUrl: 'partials/teams/detail.html', controller: 'teamDetailCtrl'
    }).when('/teams/:teamId', {
        templateUrl: 'partials/teams/detail.html', controller: 'teamDetailCtrl'
    }).when('/players', {
        templateUrl: 'partials/players/list.html', controller: 'playerCtrl'
    }).when('/players/new', {
        templateUrl: 'partials/players/detail.html', controller: 'playerDetailCtrl'
    }).when('/players/:playerId', {
        templateUrl: 'partials/players/detail.html', controller: 'playerDetailCtrl'
    }).when('/stats', {
        templateUrl: 'partials/stats/stats.html', controller: 'statCtrl'
    }).otherwise({
        redirectTo: '/'
    });
}]).run(function (editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});;