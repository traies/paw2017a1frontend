define(['paw2017a1frontend', 'directives/gameListProfile', 'services/UserService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserGamesFollowingCtrl', ['$scope', '$stateParams', 'UserService', 'sharedTypeService',function($scope, $stateParams, UserService, sharedTypeService) {
        $scope.gamesFollowing = UserService.gamesFollowing({name: $stateParams.name});
        sharedTypeService.setType('gamesFollowing')
    }]);
});