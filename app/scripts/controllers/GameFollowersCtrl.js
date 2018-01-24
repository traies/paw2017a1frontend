define(['paw2017a1frontend', 'directives/userListProfile', 'services/GameService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameFollowersCtrl', ['$scope', 'GameService', 'sharedTypeService',function($scope, GameService, sharedTypeService) {
        $scope.followers = GameService.followers({gameId: $scope.id});
        sharedTypeService.setType('followers')
    }]);
});