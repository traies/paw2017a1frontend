define(['paw2017a1frontend', 'directives/userListProfile','directives/pagination', 'directives/errorList', 'services/GameService', 'services/PaginationService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';



    paw2017a1frontend.controller('GameFollowersCtrl', ['$scope','$stateParams', '$location', 'maxPageHalf', 'perPage', 'PaginationService', 'GameService', 'sharedTypeService','baseUrl',
        function($scope, $stateParams,$location, maxPageHalf, perPage, PaginationService, GameService,  sharedTypeService, baseUrl) {
        $scope.baseUrl = baseUrl;
        var page = $stateParams.page ? parseInt($stateParams.page) : 1;
        var followersData = GameService.followers({gameId: $scope.id, page: page - 1, per_page: perPage}, function(data) {
            if (data.items.length <= 0) {
                $scope.isEmpty = true;
            } else {
                PaginationService.activate($scope, data.currentPage, data.lastPage, maxPageHalf);
                $scope.users = data.items;
            }
            $scope.url = '#!'+$location.path();
        }, function(error) {
            if (error) {
                $scope.serverError = true;
            }
        });

        sharedTypeService.setType('followers');


    }]);
});
