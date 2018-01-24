define(['paw2017a1frontend', 'services/GameService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('gameProfile', ['GameService', function(GameService) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/gameProfile.html',
            scope: {
                gameId: '@id' 
            },
            controllerAs: 'gameProfile',
            controller: ['$scope', 'GameService', function($scope, GameService){
                $scope.game = GameService.get({gameId: $scope.gameId});
            }]
        };
    }]);

});