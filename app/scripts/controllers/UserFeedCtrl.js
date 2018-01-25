define(['paw2017a1frontend', 'services/UserService', 'services/sharedTypeService', 'directives/postView', 'directives/errorList'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserFeedCtrl', ['$scope', '$stateParams', 'UserService', 'sharedTypeService', function($scope, $stateParams, UserService, sharedTypeService) {
        $scope.posts = UserService.feed({name: $stateParams.name}, function(data) {
            if (data.length <= 0) {
                $scope.isEmpty = true;
            }
        }, function(error) {
            if (error) {
                $scope.serverError = true;
            }
        });
        sharedTypeService.setType('messages');
    }]);
});