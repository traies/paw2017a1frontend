define(['paw2017a1frontend', 'directives/pagination', 'directives/gameListProfile', 'services/PaginationService', 'services/SearchService', 'services/SharedService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('SearchGamesCtrl', ['$scope', '$stateParams', '$location', 'maxPageHalf', 'perPage','PaginationService','SearchService', 'SharedService', 
    function($scope, $stateParams, $location, maxPageHalf, perPage, PaginationService, SearchService, SharedService) {
        var page = $stateParams.page ? parseInt($stateParams.page) : 1;
        SearchService.get({term: $stateParams.term, page: page -1, per_page: perPage, type: 'games'}, function(data) {
            if (data.items.length <= 0) {
                $scope.isEmpty = true;
            } else {
                $scope.games = data.items;
                PaginationService.activate($scope, data.currentPage, data.lastPage, maxPageHalf);
            }
            $scope.url = '#!' + $location.path();
            SharedService.set('resultsTotal', data.resultsTotal);
        }, function(error) {
            if (error) {
                $scope.serverError = true;
            }
        });
        SharedService.set('resultsTotal', undefined);
        SharedService.set('type', 'games');
        SharedService.set('term', $stateParams.term);
    }]);

});