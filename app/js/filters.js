'use strict';

/* Filters */

angular.module('qStat.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('positionFilter', function () {
    return function (scope, role) {
    if (!angular.isUndefined(scope) && !angular.isUndefined(role) && role.length > 0) {
        var matches = []
        angular.forEach(scope, function (position) {
            angular.forEach(role, function (role) {
                if (angular.equals(role, position.position_id)) {
               matches.push(position);
            }
          })
        }, matches);
       return(matches);
    } else {
        return scope
    };
    }
}).
  filter('playerFilter', function () {
    return function (scope, team) {
    if (!angular.isUndefined(scope) && !angular.isUndefined(team) && team.length > 0) {
        var matches = []
        angular.forEach(scope, function (player) {
            angular.forEach(team, function (team) {
                if (angular.equals(team, player)) {
               matches.push(player);
            }
          })
        }, matches);
       return(matches);
    } else {
        return scope
    };
    }
}).
  filter('teamFilter', function () {
    return function (scope, teams) {
    if (!angular.isUndefined(scope) && !angular.isUndefined(teams) && teams.length > 0) {
        var matches = []
        angular.forEach(scope, function (team) {
            angular.forEach(teams, function (teams) {
                if (angular.equals(team._id, teams._id)) {
               matches.push(team);
            }
          })
        }, matches);
       return(matches);
    } else {
        return scope
    };
    }
}).
  filter('gameFilter', function () {
    return function (scope, game) {
        var matches = []
        angular.forEach(scope, function (game) {
                if (angular.isUndefined(game.date)) {
               matches.push(game);
          }
        }, matches);
       return(matches);
       }
}).
  filter('teamPlayerFilter', function () {
    return function (scope, player) {
    if (!angular.isUndefined(scope) && !angular.isUndefined(player)) {
        var matches = []
        angular.forEach(scope, function (team) {
            angular.forEach(team.players, function (players) {
                if (angular.equals(players.player_id, player._id)) {
               matches.push(team);
            }

          })
        }, matches);
       return(matches);
    } else {
        return scope
    };
    }
}).
  filter('rosterFilter', function () {
    return function (scope, players) {
    if (!angular.isUndefined(scope) && !angular.isUndefined(players)) {
        var matches = scope
        angular.forEach(scope, function (player) {
        angular.forEach(players, function (teamPlayer) {
                if (angular.equals(player._id, teamPlayer.player_id)) {
                    var index = scope.indexOf(player)
                    scope.splice(index, 1);
                } else {
            }
          })
        }, matches);
       return(matches);
    } else {
        return scope
    };
    }
});
