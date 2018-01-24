define(['paw2017a1frontend', 'services/GameService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('gameProfile', ['GameService', 'sharedTypeService',function(GameService) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/gameProfile.html',
            scope: {
                id: '=',
                type: '='
            },
            controllerAs: 'gameProfile',
            controller: ['$scope', '$state', 'GameService', 'sharedTypeService', function($scope, $state, GameService, sharedTypeService){
                $scope.game = GameService.get({gameId: $scope.id});
                $scope.type = sharedTypeService.getType;
            }]
        };
    }]);

});