define(['paw2017a1frontend', 'services/GameService', 'services/sharedTypeService', 'directives/postView'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameFeedCtrl', ['$scope', 'GameService', 'sharedTypeService', function($scope, GameService, sharedTypeService) {
        $scope.posts = GameService.feed({gameId: $scope.id});
        sharedTypeService.setType('messages');
    }]);
});