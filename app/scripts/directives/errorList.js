define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('errorList', [function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/errorList.html',
        };
    }]);
});