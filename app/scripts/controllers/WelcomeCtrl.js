define(['paw2017a1frontend', 'services/ExploreService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('WelcomeCtrl', ['$scope', 'ExploreService', function( $scope, ExploreService) {
        $scope.trendings = ExploreService.query();
    }]);
});