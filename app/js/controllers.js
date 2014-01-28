'use strict';

/* Controllers */

var qStat = angular.module('qStat.controllers', []);

  qStat.controller('homeCtrl', [function() {

  }]);
  
/* Game Controllers */
qStat.controller('gameCtrl', function($scope, $http) {
	$http.get('games/games.json').success(function(data) {
		$scope.games = data; 
		});
	$scope.orderProp = 'name';
});
qStat.controller('gameDetailCtrl', function($scope, $routeParams) {
    $scope.gameId = $routeParams.gameId;
    });

/* Player Controllers */
qStat.controller('playerCtrl', function($scope, $http) {
	$http.get('players/players.json').success(function(data) {
		$scope.players = data;
		});
	$scope.orderProp = 'name';
});
qStat.controller('playerDetailCtrl', function($scope, $routeParams) {
    $scope.playerId = $routeParams.playerId;
    });
    
/* Stat Controllers */
qStat.controller('statCtrl', function() {

});
  
/* Team Controllers */
qStat.controller('teamCtrl', function($scope, $http) {
	$http.get('teams/teams.json').success(function(data) {
		$scope.teams = data; 
		});
	$scope.orderProp = 'name';
});
qStat.controller('teamDetailCtrl', function($scope, $routeParams) {
    $scope.teamId = $routeParams.teamId;
    });