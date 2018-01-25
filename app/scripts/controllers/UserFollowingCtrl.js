define(['paw2017a1frontend', 'directives/userListProfile', 'services/UserService', 'services/sharedTypeService', 'directives/notFound'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserFollowingCtrl', ['$scope', '$stateParams', 'UserService', 'sharedTypeService',function($scope, $stateParams, UserService, sharedTypeService) {
        $scope.users = UserService.following({name: $stateParams.name}, function(data) {
            if (data.length <= 0) {
                $scope.isEmpty = true;
            }
        }, function(error) {
            if (error) {
                $scope.serverError = true;
            }
        });
        sharedTypeService.setType('following')
    }]);
});