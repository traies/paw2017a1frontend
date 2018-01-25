define(['paw2017a1frontend', 'services/UserService', 'services/sharedTypeService', 'directives/postView'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserFeedCtrl', ['$scope', '$stateParams', 'UserService', 'sharedTypeService', function($scope, $stateParams, UserService, sharedTypeService) {
        $scope.posts = UserService.feed({name: $stateParams.name});
        sharedTypeService.setType('messages');
    }]);
});