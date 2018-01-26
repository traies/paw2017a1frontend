define(['paw2017a1frontend', 'directives/pagination','directives/gameListProfile', 'services/UserService', 'services/PaginationService', 'services/sharedTypeService', 'directives/errorList'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserGamesFollowingCtrl', ['$scope', '$stateParams', '$location', 'maxPageHalf', 'perPage', 'PaginationService', 'UserService',  'sharedTypeService',
        function($scope, $stateParams, $location, maxPageHalf, perPage, PaginationService, UserService, sharedTypeService) {
        var page = $stateParams.page ? parseInt($stateParams.page) : 1;
        $scope.games = UserService.gamesFollowing({name: $stateParams.name, page: page - 1, per_page: perPage}, function(data) {
            if (data.items.length <= 0) {
                $scope.isEmpty = true;
            } else {
                $scope.games = data.items;
                PaginationService.activate($scope, data.currentPage, data.lastPage, maxPageHalf);
            }
            $scope.url = '#!'+$location.path();
        }, function(error) {
            if (error) {
                $scope.serverError = true;
            }
        });
        sharedTypeService.setType('gamesFollowing')
    }]);
});