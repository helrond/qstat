'use strict';

/* Controllers */

var qStat = angular.module('qStat.controllers',[ 'ngResource']);

qStat.controller('homeCtrl',[ function () {
}]);

qStat.controller('navCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
});

/* Game Controllers */
qStat.controller('gameCtrl', function (Games, $scope) {
    $scope.games = Games.query();
    $scope.orderProp = 'name';
});
qStat.controller('gameDetailCtrl', function ($scope, $routeParams, $http) {
    $http.get('games/' + $routeParams.gameId + '.json').success(function (data) {
        $scope.game = data;
    });
});

/* Player Controllers */
qStat.controller('playerCtrl', function (Players, $scope) {
    $scope.players = Players.query();
    $scope.orderProp = 'name';
});
qStat.controller('playerDetailCtrl', function ($scope, $routeParams, $http) {
    $http.get('players/' + $routeParams.playerId + '.json').success(function (data) {
        $scope.player = data;
    });
    $scope.positions =[ {
        "id": 1, "name": "Beater"
    },
    {
        "id": 2, "name": "Chaser"
    },
    {
        "id": 2, "name": "Keeper"
    },
    {
        "id": 2, "name": "Utility"
    }]
});

/* Stat Controllers */
qStat.controller('statCtrl', function ($scope) {
 $scope.selectedTeam = function(selectedTeam) {new selectedTeam};
});

/* Team Controllers */
qStat.controller('teamCtrl', function (Teams, $scope) {
        $scope.teams = Teams.query();
    $scope.orderProp = 'name';
});
qStat.controller('teamDetailCtrl', function ($scope, $routeParams, $http) {
    $http.get('teams/' + $routeParams.teamId + '.json').success(function (data) {
        $scope.team = data;
    });
});