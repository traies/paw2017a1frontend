define(['paw2017a1frontend', 'services/GameService', 'services/sharedTypeService', 'directives/postView', 'directives/errorList'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameFeedCtrl', ['$scope', 'GameService', 'sharedTypeService', function($scope, GameService, sharedTypeService) {
        $scope.posts = GameService.feed({gameId: $scope.id}, function(data) {
            if (data.length <= 0) {
                $scope.isEmpty = true;
            }
        }, function(error) {
            $scope.serverError = true;
        });
        sharedTypeService.setType('messages');
    }]);
});