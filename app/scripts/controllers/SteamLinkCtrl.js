define(['paw2017a1frontend', 'directives/userProfile', 'services/SteamService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('SteamLinkCtrl', ['$scope', '$state','$log', '$stateParams','SteamService', function($scope, $state, $log, $stateParams, SteamService) {
        $scope.targetUserName = $stateParams.name;

        $scope.getDetails = function() {
            $scope.steamdetails = undefined;
            $scope.error = undefined;
            $scope.serverError = false;
            SteamService.get({steamurl: $scope.steamurl}, function(data) {
                $scope.steamdetails = data;
            }, function(error) {
                if (error.data && error.data.name) {
                    $scope.error = error.data.name;
                } else if(error.status == 500 || error.status == -1) {
                    $scope.serverError = true;
                }
                console.log(error);
            });
        };

        $scope.confirm = function() {
            SteamService.confirm({steamid: $scope.steamdetails.steamId},{}, function(data){}, function(error){});
        };
        
        $scope.cancel = function() {
            $scope.steamdetails = undefined;
        }
    }]);
});