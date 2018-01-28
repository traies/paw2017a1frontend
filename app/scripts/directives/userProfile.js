define(['paw2017a1frontend', 'services/UserService', 'services/sharedTypeService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('userProfile', ['UserService', 'sharedTypeService',function(UserService, sharedTypeService) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'views/userProfile.html',
            scope: {
                name: '=name'
            },
            controllerAs: 'userProfile',
            controller: ['$scope', '$state', 'UserService', 'sharedTypeService','baseUrl', function($scope, $state, UserService, sharedTypeService, baseUrl){
                $scope.baseUrl = baseUrl;
                $scope.targetuser = UserService.get({name: $scope.name});
                $scope.type = sharedTypeService.getType;
            }]
        };
    }]);

});
