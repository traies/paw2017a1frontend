define(['paw2017a1frontend', 'directives/userListProfile','directives/pagination', 'directives/errorList', 'services/GameService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';

    

    paw2017a1frontend.controller('GameFollowersCtrl', ['$scope','$stateParams', '$location', 'maxPageHalf', 'perPage', 'GameService', 'sharedTypeService',function($scope, $stateParams,$location, maxPageHalf, perPage, GameService, sharedTypeService) {
        var page = $stateParams.page ? parseInt($stateParams.page) : 1;
        var followersData = GameService.followers({gameId: $scope.id, page: page - 1, per_page: perPage}, function(data) {
            if (data.length <= 0) {
                $scope.isEmpty = true;
            }
            function range(from, to) {
                var ret = [];
                for (var i = from; i <= to; i++) {
                    ret.push(i);
                }
                return ret;
            }
            $scope.users = data.items;
            $scope.lastPage = data.lastPage + 1;
            var leftBound = data.currentPage - maxPageHalf > 0 ? data.currentPage - maxPageHalf : 0;
            var rightBound = data.currentPage + maxPageHalf < data.lastPage ? data.currentPage + maxPageHalf : data.lastPage;
            $scope.middleRange = range(leftBound + 1, rightBound + 1);
            $scope.currentPage = data.currentPage + 1;
            $scope.pagination = true;
            $scope.url = '#!'+$location.path();
        }, function(error) {
            if (error) {
                $scope.serverError = true;
            }
        });
        
        sharedTypeService.setType('followers');
        
       
    }]);
});