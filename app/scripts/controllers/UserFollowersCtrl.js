define(['paw2017a1frontend', 'directives/userListProfile', 'services/UserService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserFollowersCtrl', ['$scope', '$stateParams', 'UserService', 'sharedTypeService',function($scope, $stateParams, UserService, sharedTypeService) {
        $scope.followers = UserService.followers({name: $stateParams.name});
        sharedTypeService.setType('followers')
    }]);
});