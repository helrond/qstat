'use strict';


// Declare app level module which depends on filters, and services
angular.module('qStat', [
  'ngRoute',
  'qStat.filters',
  'qStat.services',
  'qStat.directives',
  'qStat.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'homeCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
