define(['paw2017a1frontend', 'directives/postView', 'services/GameService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('gameFeed', ['GameService',function(GameService) {
        return {
            restrict: 'E',  
            templateUrl: 'views/gameFeed.html',
            scope: {
                gameId: '@id'
            },
            controller: ['$scope', 'GameService', function($scope, GameService){
                $scope.active = false;
                gameProfileCtrl.register($scope);
                $scope.posts = GameService.feed({gameId: $scope.gameId});
            }]
        };
    }]);

});