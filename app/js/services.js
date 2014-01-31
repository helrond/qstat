'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('qStat.services',[]).
value('version', '0.1').
factory('Players', function ($resource) {
    return $resource('players/players.json', {
    }, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}).
factory('Games', function ($resource) {
    return $resource('games/games.json', {
    },
    {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}).
factory('Teams', function ($resource) {
    return $resource('teams/teams.json', {
    },
    {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});
