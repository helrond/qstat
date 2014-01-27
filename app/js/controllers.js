'use strict';

/* Controllers */

var qStat = angular.module('qStat.controllers', []);

  qStat.controller('homeCtrl', [function() {

  }]);
  
qStat.controller('gameListCtrl', [function() {
	$http.get('games/games.json').success(function(data) {
		$scope.games = data; 
		});
	$scope.orderProp = 'name';
}]);
  
qStat.controller('playerListCtrl', function($scope, $http) {
	$http.get('players/players.json').success(function(data) {
		$scope.players = data; 
		});
	$scope.orderProp = 'name';
});
  
qStat.controller('statCtrl', [function() {

}]);
  
qStat.controller('teamListCtrl', [function() {
	$http.get('teams/teams.json').success(function(data) {
		$scope.teams = data; 
		});
	$scope.orderProp = 'name';
}]);