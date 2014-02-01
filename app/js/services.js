'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('qStat.services',[]).
value('version', '0.1').
factory('Players', function ($resource) {
    return $resource('data/players.json', {
    }, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}).
factory('Games', function ($resource) {
    return $resource('data/games.json', {
    },
    {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}).
factory('Teams', function ($resource) {
    return $resource('data/teams.json', {
    },
    {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}).
factory('Positions', function ($resource) {
    return $resource('data/positions.json', {
    },
    {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}).
factory('Statistics', function ($resource) {
    return $resource('data/statistics.json', {
    },
    {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});
