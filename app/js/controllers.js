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
qStat.controller('gameDetailCtrl', function ($scope, $routeParams, Games) {
    var data = Games.query
    (function (data) {
        angular.forEach(data, function (game) {
            if (game.id == $routeParams.gameId)
            $scope.game = game;
        });
    });
});

/* Player Controllers */
qStat.controller('playerCtrl', function (Players, $scope) {
    $scope.players = Players.query();
    $scope.orderProp = 'name';
});
qStat.controller('playerDetailCtrl', function (Players, Positions, $scope, $routeParams) {
    var data = Players.query
    (function (data) {
        angular.forEach(data, function (player) {
            if (player.id == $routeParams.playerId)
            $scope.player = player;
        });
    });
    $scope.positions = Positions.query();
});

/* Stat Controllers */
qStat.controller('statCtrl', function (Players, Positions, Statistics, Teams, $scope) {
    $scope.players = Players.query();
    <!-- needs to be improved so it only selects players from game.selectedTeams -->
    $scope.positions = Positions.query();
    $scope.statistics = Statistics.query();
    $scope.teams = Teams.query();
    $scope.startTime = function () {
        var time = new Date()
        $scope.startTime = time;
    };
    $scope.endTime = function () {
        var time = new Date()
        $scope.endTime = time;
    };
    $scope.gameTime = function () {
        var time = $scope.endTime - $scope.startTime;
        $scope.gameTime = time;
    };
    $scope.stats =[];
    $scope.Add = function () {
        var newStat =[ {
            'team': $scope.selectedTeam,
            'position': $scope.selectedPosition,
            'player': $scope.selectedPlayer,
            'statistic': $scope.selectedStat,
            'time': new Date()
        }]
        console.log(newStat)
        var currentStats = $scope.stats;
        var updatedStats = currentStats.concat(newStat);
        $scope.stats = updatedStats
    };
    $scope.AddPossession = function () {
        var newStat =[ {
            'team': $scope.possessionTeam,
            'statistic': {
                'name': 'possession',
                'value': true
            },
            'time': new Date()
        }]
        console.log(newStat)
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
qStat.controller('teamDetailCtrl', function (Teams, $scope, $routeParams) {
    var data = Teams.query
    (function (data) {
        angular.forEach(data, function (team) {
            if (team.id == $routeParams.teamId)
            $scope.team = team;
        });
    });
});