define(['paw2017a1frontend', 'directives/gameProfile'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameCtrl', ['$scope', '$state','$log', '$stateParams', function($scope, $state, $log, $stateParams,) {
        $scope.gameId = $stateParams.id;
    }]);
});