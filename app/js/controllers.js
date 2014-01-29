'use strict';

/* Controllers */

var qStat = angular.module('qStat.controllers',[]);

qStat.controller('homeCtrl',[ function () {
}]);

/* Game Controllers */
qStat.controller('gameCtrl', function ($scope, $http) {
    $http.get('games/games.json').success(function (data) {
        $scope.games = data;
    });
    $scope.orderProp = 'name';
});
qStat.controller('gameDetailCtrl', function ($scope, $routeParams, $http) {
    $http.get('games/' + $routeParams.gameId + '.json').success(function (data) {
        $scope.game = data;
    });
});

/* Player Controllers */
qStat.controller('playerCtrl', function ($scope, $http) {
    $http.get('players/players.json').success(function (data) {
        $scope.players = data;
    });
    $scope.orderProp = 'name';
});
qStat.controller('playerDetailCtrl', function ($scope, $routeParams, $http) {
    $http.get('players/' + $routeParams.playerId + '.json').success(function (data) {
        $scope.player = data;
    });
    $scope.positions =[ {
        "id": 1, "name": "Beater"
    }, {
        "id": 2, "name": "Chaser"
    }, {
        "id": 2, "name": "Keeper"
    }, {
        "id": 2, "name": "Utility"
    }]
});

/* Stat Controllers */
qStat.controller('statCtrl', function () {
});

/* Team Controllers */
qStat.controller('teamCtrl', function ($scope, $http) {
    $http.get('teams/teams.json').success(function (data) {
        $scope.teams = data;
    });
    $scope.orderProp = 'name';
});
qStat.controller('teamDetailCtrl', function ($scope, $routeParams, $http) {
    $http.get('teams/' + $routeParams.teamId + '.json').success(function (data) {
        $scope.team = data;
    });
});