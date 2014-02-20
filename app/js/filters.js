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
});
