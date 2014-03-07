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
    $scope.AddPosition = function (positions) {
        if ($scope.player.positions) {
            $scope.player.positions = $scope.player.positions
        } else {
            $scope.player.positions =[];
        }
        var addPosition = {
            'name': $scope.addPosition.name,
            'position_id': $scope.addPosition.position_id
        }
        var currentPlayers = $scope.player.positions;
        var updatedPositions = currentPlayers.concat(addPosition);
        $scope.player.positions = updatedPositions
    };
    $scope.DeletePosition = function (position) {
        var index = $scope.player.positions.indexOf(position)
        $scope.player.positions.splice(index, 1);
    };
});

/* Stat Controllers */
qStat.controller('statCtrl', function ($http, $scope) {
    $http.get('/api/players').success(function (data, status, headers, config) {
        $scope.players = data;
    });
    $http.get('/api/teams').success(function (data, status, headers, config) {
        $scope.teams = data;
    });
    $http.get('/api/games').success(function (data, status, headers, config) {
        $scope.games = data;
    });
    $http.get('/api/positions').success(function (data, status, headers, config) {
        $scope.positions = data;
    });
    $http.get('/api/statistics').success(function (data, status, headers, config) {
        $scope.statistics = data;
    });
    
    $scope.fouls =[ {
        'foul_id': 'redCard',
        'name': 'Red Card'
    },
    {
        'foul_id': 'yellowCard',
        'name': 'Yellow Card'
    }]
    
    $scope.foulTypes =[ {
        'foulType_id': 'procedureInfraction',
        'name': 'Procedure Infraction'
    }, {
        'foulType_id': 'illegalContact',
        'name': 'Illegal Contact'
    }, {
        'foulType_id': 'gameplayInfraction',
        'name': 'Gameplay Infraction'
    }, {
        'foulType_id': 'unsportsmanlikeConduct',
        'name': 'Unsportsmanlike Conduct'
    }]
    
    $scope.startTime = function () {
        console.log('time started')
        $scope.record = true
        var time = new Date()
        $scope.selectedGame.startTime = time;
    };
    $scope.recordStats = function () {
        console.log('recording stats')
        $scope.statRecord = true
    };
    $scope.pauseTime = function () {
        console.log('time paused')
        $scope.pause = true
        var time = new Date()
        $scope.selectedGame.pauseStartTime = time
    };
    $scope.restartTime = function () {
        if(angular.isUndefined($scope.selectedGame.pauseTime)){
            $scope.selectedGame.pauseTime = []
        }
        console.log('time restarted')
        $scope.pause = null
        var time = new Date()
        $scope.selectedGame.pauseEndTime = time
        var pauseTime = $scope.selectedGame.pauseTime
        var newPauseTime = $scope.selectedGame.pauseEndTime - $scope.selectedGame.pauseStartTime
        console.log(newPauseTime)
        $scope.selectedGame.pauseTime = +pauseTime + +newPauseTime
        console.log(pauseTime)
        $scope.selectedGame.pauseStartTime = []
        $scope.selectedGame.pauseEndTime = []
    };
    $scope.endTime = function () {
        console.log('time stopped')
        $scope.confirm = true
        var time = new Date()
        $scope.selectedGame.endTime = time;
        var gameTime = $scope.selectedGame.endTime - $scope.selectedGame.startTime;
        $scope.selectedGame.gameTime = gameTime - $scope.selectedGame.pauseTime;
    };
    $scope.endRecordStats = function () {
        console.log('end recording stats')
        $scope.confirm = true
    };
    $scope.Add = function () {
        if ($scope.selectedFoul) {
            if ($scope.selectedFoul.foul_id === 'yellowCard') {
                var newStat =[ {
                    'name': $scope.selectedFoul.name,
                    'statistic_id': $scope.selectedFoul.foul_id,
                    'type': {
                        'name': $scope.selectedFoulType.name,
                        'foulType_id': $scope.selectedFoulType.foulType_id
                    },
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
                }]
            } else {
                var newStat =[ {
                    'name': $scope.selectedFoul.name,
                    'statistic_id': $scope.selectedFoul.foul_id,
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
                }]
            }
        } else if ($scope.selectedStat. double && $scope.success === true) {
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
        updatedGameStats.sort(function (a, b) {
            return b.time - a.time
        });
        $scope.selectedGame.statistics = updatedGameStats;
        
        if (!angular.isUndefined($scope.selectedStat) && $scope.selectedStat != null) {
        if ($scope.selectedStat.primary_id === 'snitchCatch') {
            $scope.confirm = true
            $scope.endTime = new function () {
                var time = new Date()
                $scope.selectedGame.endTime = time;
            };
            $scope.gameTime = new function () {
                var time = $scope.selectedGame.endTime - $scope.selectedGame.startTime;
                $scope.selectedGame.gameTime = time;
            };
          }
        }
        
        if ($scope.selectedPositionLock === true) {
        } else {
            $scope.selectedPosition = null;
        }
        $scope.selectedTeam = null;
        $scope.selectedPlayer = null;
        $scope.selectedStat = null;
        $scope.selectedFoul = null
        $scope.selectedFoulType = null;
    };
    $scope. Delete = function (stat) {
        var index = $scope.selectedGame.statistics.indexOf(stat)
        var id = $scope.selectedGame.statistics[index]._id
        $scope.selectedGame.statistics.splice(index, 1);
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
        updatedGameStats.sort(function (a, b) {
            return b.time - a.time
        });
        $scope.selectedGame.statistics = updatedGameStats
        var team1value =[]
        var team2value =[]
    }
    $scope.Confirm = function (stat) {
        var gameId = $scope.selectedGame._id
        $http.put('/api/games/' + gameId, $scope.selectedGame).success(function (data) {
            window.location.href = "/#/games";
        })
        var stats = $scope.selectedGame.statistics
        angular.forEach(stats, function (stat) {
            if (! angular.isUndefined(stat.player)) {
                var newStat = {
                    'player_id': stat.player.player_id,
                    'statistics':[ {
                        'name': stat.name,
                        'statistic_id': stat.statistic_id,
                        'team': stat.team,
                        'position': stat.position,
                        'time': stat.time,
                        'attribute': stat.attribute
                    }]
                }
                var playerId = stat.player.player_id
                console.log(newStat)
                $http.put('api/players/' + playerId, newStat);
            }
        });
        // iterate through stats, add stat matching stat.player.player_id with players.player_id
        // put stats in player
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
        var addPlayer = {
            'name': $scope.addPlayer.name,
            'player_id': $scope.addPlayer._id
        }
        var currentPlayers = $scope.team.players;
        console.log(currentPlayers)
        var updatedPlayers = currentPlayers.concat(addPlayer);
        $scope.team.players = updatedPlayers
    };
    $scope.DeletePlayer = function (player) {
        var index = $scope.team.players.indexOf(player)
        $scope.team.players.splice(index, 1);
    };
    $http.get('/api/players').success(function (data, status, headers, config) {
        $scope.players = data;
    });
});