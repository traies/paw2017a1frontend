define(['paw2017a1frontend', 'directives/gameProfile', 'services/GameService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameCtrl', ['$scope', '$state','$log', '$stateParams','GameService', function($scope, $state, $log, $stateParams, GameService) {
        $scope.gameId = $stateParams.id;
        $scope.gameName = GameService.getgame({gameId: $scope.gameId});
    }]);
});
