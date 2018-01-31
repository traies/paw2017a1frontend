define(['paw2017a1frontend', 'services/GameService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('gameProfile', ['GameService', 'sharedTypeService',function(GameService, sharedTypeService) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/gameProfile.html',
            scope: {
                id: '='
            },
            controllerAs: 'gameProfile',
            controller: ['$scope', '$state', 'GameService', 'sharedTypeService', 'sessionService', function($scope, $state, GameService, sharedTypeService, session){
                $scope.game = GameService.get({gameId: $scope.id});
                $scope.type = sharedTypeService.getType;

                $scope.follow = function(){
                  if(!session.isLoggedIn()){
                    return ;
                  }
                  GameService.follow({id: $scope.id}).$promise
                             .then(function(data){
                               $scope.game.currentUserFollows = true;
                             },function(err){

                             });
                };

                $scope.unfollow = function(){
                  if(!session.isLoggedIn()){
                    return ;
                  }
                  GameService.unfollow({id: $scope.id}).$promise
                             .then(function(data){
                               $scope.game.currentUserFollows = false;
                             },function(err){

                             });

                };
            }]
        };
    }]);

});
