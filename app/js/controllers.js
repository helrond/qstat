'use strict';

/* Controllers */

var qStat = angular.module('qStat.controllers',[ 'ngResource']);

qStat.controller('homeCtrl',[ function () {
}]);

qStat.controller('navCtrl', function ($scope, $location) {
    $scope.isActive = function (route) {
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
qStat.controller('playerDetailCtrl', function (Players, Positions, $scope, $routeParams, $http) {
    $http.get('players/' + $routeParams.playerId + '.json').success(function (data) {
        $scope.player = data;
    });
    $scope.positions = Positions.query();
});

/* Stat Controllers */
qStat.controller('statCtrl', function (Players, Positions, Statistics, $scope) {
    $scope.players = Players.query();
    <!-- needs to be improved so it only selects players from selectedTeam -->
    $scope.positions = Positions.query();
    $scope.statistics = Statistics.query();
    $scope.startTime = function() {
        var time = new Date()
        $scope.startTime = time;};
    $scope.endTime = function() {
        var time = new Date()
        $scope.endTime = time;};
    $scope.gameTime = function() {
        var time = $scope.endTime - $scope.startTime;
        $scope.gameTime = time;};
    $scope.stats =[];
    $scope.Add = function () {
        var newStat =[ {
            'team': $scope.selectedTeam,
            'position': $scope.selectedPosition,
            'player': $scope.selectedPlayerName,
            'statistic': $scope.selectedStatStatistic,
            'time': new Date()
        }]
        var currentStats = $scope.stats;
        var updatedStats = currentStats.concat(newStat);
        $scope.stats = updatedStats
    }
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