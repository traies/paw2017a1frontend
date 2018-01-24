define(['paw2017a1frontend', 'services/GameService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('gameFollowers', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/gameFollowers.html',
            scope: {
                gameId: '@id'
            },
            controller: ['$scope', 'GameService', function($scope, GameService) {
                $scope.followers = GameService.followers({gameId: $scope.gameId});
            }]
        }
    });

});