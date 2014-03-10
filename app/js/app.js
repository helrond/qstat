'use strict';


// Declare app level module which depends on filters, and services
angular.module('qStat',[
'ngRoute',
'qStat.filters',
'qStat.services',
'qStat.directives',
'qStat.controllers',
'xeditable',
'UserApp']).
config([ '$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/home.html', controller: 'homeCtrl', public:true
    }).when('/games', {
        templateUrl: 'partials/games/list.html', controller: 'gameCtrl', public:true
    }).when('/games/new', {
        templateUrl: 'partials/games/new.html', controller: 'gameDetailCtrl', hasPermission:'games'
    }).when('/games/:gameId', {
        templateUrl: 'partials/games/detail.html', controller: 'gameDetailCtrl', public:true
    }).when('/teams', {
        templateUrl: 'partials/teams/list.html', controller: 'teamCtrl', public:true
    }).when('/teams/new', {
        templateUrl: 'partials/teams/new.html', controller: 'teamDetailCtrl', hasPermission:'teams'
    }).when('/teams/:teamId', {
        templateUrl: 'partials/teams/detail.html', controller: 'teamDetailCtrl', public:true
    }).when('/players', {
        templateUrl: 'partials/players/list.html', controller: 'playerCtrl', public:true
    }).when('/players/new', {
        templateUrl: 'partials/players/new.html', controller: 'playerDetailCtrl', hasPermission:'players'
    }).when('/players/:playerId', {
        templateUrl: 'partials/players/detail.html', controller: 'playerDetailCtrl', public:true
    }).when('/stats', {
        templateUrl: 'partials/stats/stats.html', controller: 'statCtrl', hasPermission:'stats'
    }).when('/login', {
        templateUrl: 'partials/users/login.html', controller: 'userCtrl', public:true, login:true
    }).when('/users/:userId', {
        templateUrl: 'partials/users/detail.html', controller: 'userDetailCtrl', public:true
    }).otherwise({
        redirectTo: '/'
    });
}]).run(function (editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}).run(function($rootScope, user) {
    user.init({ appId: '531cec29e556d' });
});