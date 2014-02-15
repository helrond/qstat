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
        $scope.game = {
        };
    }
    $http.get('/api/teams').success(function (data, status, headers, config) {
        $scope.teams = data;
    });
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
qStat.controller('playerDetailCtrl', function ($scope, $routeParams, $http) {
    if ($routeParams.playerId) {
        $http.get('/api/players/' + $routeParams.playerId).success(function (data) {
            $scope.player = data;
        })
    } else {
        $scope.player = {
        };
    };
    
    $scope.Add = function () {
        $http.post('/api/players', $scope.player).success(function (data) {
            window.location.href = "/#/players";
        })
    };
    $scope.Update = function () {
        $http.put('/api/players/' + $routeParams.playerId, $scope.player).
        success(function (data) {
        });
    };
    $http.get('/api/positions').success(function (data, status, headers, config) {
        $scope.positions = data;
    });
    $http.get('/api/teams').success(function (data, status, headers, config) {
        $scope.teams = data;
    });
});

/* Stat Controllers */
qStat.controller('statCtrl', function ($http, $scope) {
    $http.get('/api/players').success(function (data, status, headers, config) {
        $scope.players = data;
    });
    <!-- needs to be improved so it only selects players from game.selectedTeams -->
    $http.get('/api/positions').success(function (data, status, headers, config) {
        $scope.positions = data;
    });
    $http.get('/api/statistics').success(function (data, status, headers, config) {
        $scope.statistics = data;
    });
    
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
    $scope.Add = function () {
        if ($scope.selectedStat. double && $scope.success === true) {
            var newStat =[ {
                'name': $scope.selectedStat.primaryName,
                'statistic_id': $scope.selectedStat.primary_id,
                'team': {
                    'name': $scope.selectedTeam.name,
                    'team_id': $scope.selectedTeam._id
                },
                'position': {
                    'name': $scope.selectedPosition.name,
                    'position_id': $scope.selectedPosition.position_id
                },
                'player': {
                    'name': $scope.selectedPlayer.name,
                    'player_id': $scope.selectedPlayer._id
                },
                'time': new Date(),
                'attribute': $scope.selectedStat.attribute
            },
            {
                'name': $scope.selectedStat.secondaryName,
                'statistic_id': $scope.selectedStat.secondary_id,
                'team': {
                    'name': $scope.selectedTeam.name,
                    'team_id': $scope.selectedTeam._id
                },
                'position': {
                    'name': $scope.selectedPosition.name,
                    'position_id': $scope.selectedPosition.position_id
                },
                'player': {
                    'name': $scope.selectedPlayer.name,
                    'player_id': $scope.selectedPlayer._id
                },
                'time': new Date(),
                'attribute': $scope.selectedStat.attribute
            }]
        } else {
            var newStat =[ {
                'name': $scope.selectedStat.primaryName,
                'statistic_id': $scope.selectedStat.primary_id,
                'team': {
                    'name': $scope.selectedTeam.name,
                    'team_id': $scope.selectedTeam._id
                },
                'position': {
                    'name': $scope.selectedPosition.name,
                    'position_id': $scope.selectedPosition.position_id
                },
                'player': {
                    'name': $scope.selectedPlayer.name,
                    'player_id': $scope.selectedPlayer._id
                },
                'time': new Date(),
                'attribute': $scope.selectedStat.attribute
            }]
        }
        var currentGameStats = $scope.selectedGame.statistics;
        var updatedGameStats = currentGameStats.concat(newStat);
        $scope.selectedGame.statistics = updatedGameStats
    };
    $scope. Delete = function (stat) {
        var index = $scope.stats.indexOf(stat)
        var id = $scope.stats[index]._id
        $scope.stats.splice(index, 1);
    }
    $scope.AddPossession = function () {
        if ($scope.selectedGame.teams[0]._id === $scope.possessionTeam) {
            var team1value = true
            var team2value = false
        } else {
            var team1value = false
            var team2value = true
        }
        
        var newStat =[ {
            'team': {
                'name': $scope.selectedGame.teams[0].name,
                'team_id': $scope.selectedGame.teams[0]._id
            },
            'name': 'possession',
            'value': team1value,
            'time': new Date()
        },
        {
            'team': {
                'name': $scope.selectedGame.teams[1].name,
                'team_id': $scope.selectedGame.teams[1]._id
            },
            'name': 'possession',
            'value': team2value,
            'time': new Date()
        }]
        var currentGameStats = $scope.selectedGame.statistics;
        var updatedGameStats = currentGameStats.concat(newStat);
        $scope.selectedGame.statistics = updatedGameStats
        var team1value =[]
        var team2value =[]
    }
    $scope.Confirm = function () {
        var gameId = $scope.selectedGame._id
        $http.put('/api/games/' + gameId, $scope.selectedGame).success(function (data) {
            window.location.href = "/#/games";
        })
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
    if ($routeParams.teamId) {
        $http.get('/api/teams/' + $routeParams.teamId).success(function (data) {
            $scope.team = data;
        });
    } else {
        $scope.team = {
        };
    }
    $scope.Add = function () {
        $http.post('/api/teams', $scope.team).success(function (data) {
            window.location.href = "/#/teams";
        })
    };
    $scope.Update = function () {
        $http.put('/api/teams/' + $routeParams.teamId, $scope.team).
        success(function (data) {
        });
    };
    $scope.AddPlayer = function (player) {
        if ($scope.team.players) {
            $scope.team.players = $scope.team.players
        } else {
            $scope.team.players =[];
        }
        var addPlayer = $scope.addPlayer
        var currentPlayers = $scope.team.players;
        console.log(currentPlayers)
        var updatedPlayers = currentPlayers.concat(addPlayer);
        $scope.team.players = updatedPlayers
    };
    $scope.DeletePlayer = function (player) {
        var index = $scope.team.players.indexOf(player)
        var id = $scope.team.players[index]._id
        $scope.team.players.splice(index, 1);
    };
    $http.get('/api/players').success(function (data, status, headers, config) {
        $scope.players = data;
    });
});