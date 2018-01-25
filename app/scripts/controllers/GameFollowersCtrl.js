define(['paw2017a1frontend', 'directives/userListProfile', 'directives/notFound', 'services/GameService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameFollowersCtrl', ['$scope', 'GameService', 'sharedTypeService',function($scope, GameService, sharedTypeService) {
        $scope.isEmpty = false;
        $scope.serverError = false;
        $scope.users = GameService.followers({gameId: $scope.id}, function(data) {
            if (data.length <= 0) {
                $scope.isEmpty = true;
            }
        }, function(error) {
            if (error) {
                $scope.serverError = true;
            }
        });
        sharedTypeService.setType('followers');
    }]);
});