define(['paw2017a1frontend', 'services/ExploreService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('WelcomeCtrl', ['$scope', '$log', 'ExploreService', function($scope, $log, ExploreService) {
        $scope.trendings = ExploreService.query( function (data) {
            // success 
        }, function (error) {
            // error handling
            $log.debug('Explore service query failed. ');
        });
    }]);
});