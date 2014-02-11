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
qStat.controller('gameCtrl', function ($http, $scope) {
    $http.get('/api/games').success(function (data, status, headers, config) {
        $scope.games = data;
    });
    $scope.orderProp = 'name';
    $scope. Delete = function (game) {
        var index = $scope.games.indexOf(game)
        var id = $scope.games[index]._id
        $http. delete ('/api/games/' + id).success(function () {
            $scope.games.splice(index, 1);
        });
    }
});
qStat.controller('gameDetailCtrl', function ($scope, $routeParams, $http) {
    if ($routeParams.gameId) {
        $http.get('/api/games/' + $routeParams.gameId).success(function (data) {
            $scope.game = data;
        });
    } else {
        $http.get('/api/teams').success(function (data, status, headers, config) {
            $scope.teams = data;
        });
        $scope.game ={};
    }
    $scope.Add = function () {
        $http.post('/api/games', $scope.game).success(function (data) {
            window.location.href = "/#/games";
        })
    };
    $scope.Update = function () {
        $http.put('/api/games/' + $routeParams.gameId, $scope.game).
        success(function (data) {
        });
    };
});

/* Player Controllers */
qStat.controller('playerCtrl', function ($http, $scope) {
    $http.get('/api/players').success(function (data, status, headers, config) {
        $scope.players = data;
    });
    $scope.orderProp = 'name';
    $scope. Delete = function (player) {
        var index = $scope.players.indexOf(player)
        var id = $scope.players[index]._id
        $http. delete ('/api/players/' + id).success(function () {
            $scope.players.splice(index, 1);
        });
    }
});
qStat.controller('playerDetailCtrl', function (Positions, $scope, $routeParams, $http) {
    if ($routeParams.playerId) {
        $http.get('/api/players/' + $routeParams.playerId).success(function (data) {
            $scope.player = data;
        })
    } else {
        $scope.player =[];
    };
    
    $scope.Add = function () {
        // Add function here
    };
    $scope.Update = function () {
        $http.put('/api/players/' + $routeParams.playerId, $scope.player).
        success(function (data) {
        });
    };
    $scope.positions = Positions.query();
});

/* Stat Controllers */
qStat.controller('statCtrl', function ($http, Positions, Statistics, Teams, $scope) {
    $http.get('/api/players').success(function (data, status, headers, config) {
        $scope.players = data;
    });
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
qStat.controller('teamCtrl', function ($scope, $http) {
    $http.get('/api/teams').success(function (data, status, headers, config) {
        $scope.teams = data;
    });
    $scope.orderProp = 'name';
    $scope. Delete = function (team) {
        var index = $scope.teams.indexOf(team)
        var id = $scope.teams[index]._id
        $http. delete ('/api/teams/' + id).success(function () {
            $scope.teams.splice(index, 1);
        });
    }
    $http.get('/api/players').success(function (data, status, headers, config) {
        $scope.players = data;
    });
});
qStat.controller('teamDetailCtrl', function ($http, $scope, $routeParams) {
    $http.get('/api/teams/' + $routeParams.teamId).success(function (data) {
        $scope.team = data;
    });
    $scope.Add = function () {
        // Add function here
    };
    $scope.Update = function () {
        $http.put('/api/teams/' + $routeParams.teamId, $scope.team).
        success(function (data) {
        });
    };
});