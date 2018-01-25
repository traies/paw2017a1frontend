define(['paw2017a1frontend', 'directives/userListProfile', 'services/UserService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserFollowingCtrl', ['$scope', '$stateParams', 'UserService', 'sharedTypeService',function($scope, $stateParams, UserService, sharedTypeService) {
        $scope.followers = UserService.following({name: $stateParams.name});
        sharedTypeService.setType('following')
    }]);
});