define(['paw2017a1frontend', 'services/GameService', 'services/sharedTypeService', 'directives/postView', 'directives/notFound'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameFeedCtrl', ['$scope', 'GameService', 'sharedTypeService', function($scope, GameService, sharedTypeService) {
        $scope.isEmpty = false;
        $scope.serverError = false;
        $scope.posts = GameService.feed({gameId: $scope.id}, function(data) {
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