define(['paw2017a1frontend', 'directives/userListProfile', 'services/UserService', 'services/sharedTypeService', 'services/PaginationService', 'directives/errorList'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserFollowingCtrl', ['$scope', '$stateParams','$location', 'maxPageHalf', 'perPage','PaginationService' ,'UserService', 'sharedTypeService', 
        function($scope, $stateParams, $location, maxPageHalf, perPage, PaginationService, UserService, sharedTypeService) {
        var page = $stateParams.page ? parseInt($stateParams.page) : 1;
        $scope.users = UserService.following({name: $stateParams.name, page: page - 1, per_page: perPage}, function(data) {
            if (data.items.length <= 0) {
                $scope.isEmpty = true;
            } else {
                $scope.users = data.items;
                PaginationService.activate($scope, data.currentPage, data.lastPage, maxPageHalf);
            }
            
            $scope.url = '#!'+$location.path();
        }, function(error) {
            if (error) {
                $scope.serverError = true;
            }
        });
        sharedTypeService.setType('following')
    }]);
});