define(['paw2017a1frontend', 'directives/userProfile'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserCtrl', ['$scope', '$state','$log', '$stateParams', function($scope, $state, $log, $stateParams,) {
        $scope.targetUserName = $stateParams.name;
    }]);
});
