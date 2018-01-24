define(['paw2017a1frontend', 'services/GameService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameFeedCtrl', ['$scope', 'GameService', 'sharedTypeService', function($scope, GameService, sharedTypeService) {
        $scope.posts = GameService.feed({gameId: '730'});
        sharedTypeService.setType('messages');
    }]);

});