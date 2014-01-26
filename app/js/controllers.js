'use strict';

/* Controllers */

var qStat = angular.module('qStat.controllers', []);

  qStat.controller('homeCtrl', [function() {

  }]);
  
  qStat.controller('gameCtrl', [function() {

  }]);
  
qStat.controller('playerCtrl', function($scope, $http) {
	  $http.get('players/players.json').success(function(data) {
    	$scope.players = data;
  });
    $scope.orderProp = 'age';
});
  
  qStat.controller('statCtrl', [function() {

  }]);
  
  qStat.controller('teamCtrl', [function() {

  }]);