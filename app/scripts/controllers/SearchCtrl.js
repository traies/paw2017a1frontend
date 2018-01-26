define(['paw2017a1frontend', 'directives/gameListProfile', 'directives/ErrorList', 'services/SearchService', 'services/SharedService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('SearchCtrl', ['$scope', '$stateParams','SearchService', 'SharedService',function($scope, $stateParams, SearchService, SharedService) {
        $scope.shared = SharedService.get;
    }]);

});