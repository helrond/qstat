'use strict';

/* Controllers */

var qStat = angular.module('qStat.controllers', []);

  qStat.controller('homeCtrl', [function() {

  }]);
  
qStat.controller('gameCtrl', function($scope, $http) {
	$http.get('games/games.json').success(function(data) {
		$scope.games = data; 
		});
	$scope.orderProp = 'name';
});
  
qStat.controller('playerCtrl', function($scope, $http) {
	$http.get('players/players.json').success(function(data) {
		$scope.players = data; 
		});
	$scope.orderProp = 'name';
});
  
qStat.controller('statCtrl', function() {

});
  
qStat.controller('teamCtrl', function($scope, $http) {
	$http.get('teams/teams.json').success(function(data) {
		$scope.teams = data; 
		});
	$scope.orderProp = 'name';
});