define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('pagination', [function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/pagination.html',
        };
    }]);
});