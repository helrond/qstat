'use strict';

/* Controllers */

var qStat = angular.module('qStat.controllers', []);

  qStat.controller('homeCtrl', [function() {

  }]);
  
  qStat.controller('gameCtrl', [function() {

  }]);
  
qStat.controller('playerCtrl', function($scope) {
	  $scope.players = [
	{
		"@context":"http://schema.org/Person",
		"id":"1",
		"name":"Alvin Arnold",
		"image":null,
		"number":"13",
		"description":"World's biggest nerd.",
		"position":"Chaser"
	}
	  ];
});
  
  qStat.controller('statCtrl', [function() {

  }]);
  
  qStat.controller('teamCtrl', [function() {

  }]);