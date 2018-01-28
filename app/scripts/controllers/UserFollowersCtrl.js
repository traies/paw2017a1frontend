define(['paw2017a1frontend', 'directives/userListProfile', 'services/UserService', 'services/sharedTypeService', 'services/PaginationService', 'directives/errorList', 'directives/pagination'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('UserFollowersCtrl', ['$scope', '$stateParams', '$location', 'maxPageHalf', 'perPage', 'PaginationService', 'UserService','sharedTypeService','baseUrl',function($scope, $stateParams, $location, maxPageHalf, perPage, PaginationService, UserService, sharedTypeService, baseUrl) {
        $scope.baseUrl = baseUrl;
        $scope.users = UserService.followers({name: $stateParams.name}, function(data) {
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
        sharedTypeService.setType('followers');
        $scope.users = undefined;
    }]);
});
