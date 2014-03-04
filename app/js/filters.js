'use strict';

/* Filters */

angular.module('qStat.filters',[]).
filter('interpolate',[ 'version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}]).
filter('positionFilter', function () {
    return function (scope, role) {
        if (! angular.isUndefined(scope) && ! angular.isUndefined(role) && role.length > 0) {
            var matches =[]
            angular.forEach(scope, function (position) {
                angular.forEach(role, function (role) {
                    if (angular.equals(role, position.position_id)) {
                        matches.push(position);
                    }
                })
            },
            matches);
            return (matches);
        } else {
            return scope
        };
    }
}).
filter('positionPlayerFilter', function () {
    return function (scope, positions) {
        if (! angular.isUndefined(scope) && ! angular.isUndefined(positions) && positions.length > 0) {
            var matches =[]
            angular.forEach(scope, function (position) {
                angular.forEach(positions, function (playerPosition) {
                    if (angular.equals(playerPosition.position_id, position.position_id)) {
                        matches.push(position);
                    }
                })
            },
            matches);
            return (matches);
        } else {
            return scope
        };
    }
}).
filter('playerFilter', function () {
    return function (scope, team) {
        if (! angular.isUndefined(scope) && ! angular.isUndefined(team) && team.length > 0) {
            var matches =[]
            angular.forEach(scope, function (player) {
                angular.forEach(team, function (teamPlayer) {
                    if (angular.equals(teamPlayer.player_id, player._id)) {
                        matches.push(player);
                    }
                })
            },
            matches);
            return (matches);
        } else {
            return scope
        };
    }
}).
filter('teamFilter', function () {
    return function (scope, teams) {
        if (! angular.isUndefined(scope) && ! angular.isUndefined(teams) && teams.length > 0) {
            var matches =[]
            angular.forEach(scope, function (team) {
                angular.forEach(teams, function (teams) {
                    if (angular.equals(team._id, teams._id)) {
                        matches.push(team);
                    }
                })
            },
            matches);
            return (matches);
        } else {
            return scope
        };
    }
}).
filter('gameFilter', function () {
    return function (scope, game) {
        var matches =[]
        angular.forEach(scope, function (game) {
            if (angular.isUndefined(game.date)) {
                matches.push(game);
            }
        },
        matches);
        return (matches);
    }
}).
filter('teamPlayerFilter', function () {
    return function (scope, player) {
        if (! angular.isUndefined(scope) && ! angular.isUndefined(player) && player != null) {
            if (! angular.isUndefined(player._id)) {
                var matches =[]
                angular.forEach(scope, function (team) {
                    angular.forEach(team.players, function (players) {
                        if (angular.equals(players.player_id, player._id)) {
                            matches.push(team);
                        }
                    })
                },
                matches);
                return (matches);
            }
        } else {
            return scope
        };
    }
}).
filter('rosterFilter', function () {
    return function (scope, players) {
        if (! angular.isUndefined(scope) && ! angular.isUndefined(players)) {
            var matches = scope
            angular.forEach(scope, function (player) {
                angular.forEach(players, function (teamPlayer) {
                    if (angular.equals(player._id, teamPlayer.player_id)) {
                        var index = scope.indexOf(player)
                        scope.splice(index, 1);
                    } else {
                    }
                })
            },
            matches);
            return (matches);
        } else {
            return scope
        };
    }
}).filter('possessionFilter', function () {
    return function (input) {
        return input ? 'gain': 'lose';
    };
});