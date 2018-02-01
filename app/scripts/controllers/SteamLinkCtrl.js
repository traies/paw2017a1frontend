define(['paw2017a1frontend', 'directives/userProfile', 'services/SteamService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('SteamLinkCtrl', ['$window', '$scope', '$state','$log', '$stateParams','SteamService', 'baseUrl', function($window, $scope, $state, $log, $stateParams, SteamService, baseUrl) {
        $scope.targetUserName = $stateParams.name;

        $scope.getDetails = function() {
            $scope.steamdetails = undefined;
            $scope.error = undefined;
            $scope.serverError = false;
            SteamService.get({steamurl: $scope.steamurl}, function(data) {
                $scope.steamdetails = data;
                $scope.games = {};
                $scope.users = {};
                $scope.gameresults = SteamService.getOwned({steamid: $scope.steamdetails.steamId},
                    function(data) {
                        $scope.gameresults.done = true;
                    }, function(error) {
                        $scope.gameresults.error = true;
                    }
                );
                $scope.userlist = SteamService.getFriends({steamid: $scope.steamdetails.steamId},
                    function(data) {
                        $scope.userlist.done = true;
                    }, function(error) {
                        $scope.userlist.error = true;
                    }
                );
                $scope.all = true;

                $scope.submit = function() {
                    var submit = {};
                    submit.games = [];
                    submit.users = [];
                    submit.steamid = $scope.steamdetails.steamId;
                    angular.forEach($scope.gameresults, function(game) {
                        if (game.selected) {
                            submit.games.push({name: game.name, id: game.appid });
                        }
                    }).$promise.then(function() {
                        angular.forEach($scope.userlist, function(user) {
                            if (user.selected) {
                                submit.users.push({name: user.name, id: user.id});
                            }
                        }).$promise.then(function() {
                            SteamService.confirm({}, submit, function(data) {
                                $window.location.href = '#!/';
                            }, function (error) {

                            });
                        });
                    });
                }
            }, function(error) {
                if (error.data && error.data.name) {
                    $scope.error = error.data.name;
                } else if(error.status == 500 || error.status == -1) {
                    $scope.serverError = true;
                }
            });
        };
        
        $scope.cancel = function() {
            $scope.steamdetails = undefined;
            $scope.gameresults = undefined;
            $scope.userlist = undefined;
        }

        
    }]);
});