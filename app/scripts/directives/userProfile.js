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
            controller: ['$scope', '$state', 'UserService', 'sharedTypeService','baseUrl', 'sessionService', function($scope, $state, UserService, sharedTypeService, baseUrl, session){
                $scope.baseUrl = baseUrl;
                $scope.targetuser = UserService.get({name: $scope.name});
                $scope.type = sharedTypeService.getType;

                $scope.follow = function(){
                  if(!session.isLoggedIn()){
                    return;
                  }
                  UserService.follow({name: $scope.targetuser.name}).$promise
                             .then(function(data){
                               $scope.targetuser.currentUserFollows = true;
                               $scope.targetuser.followers++;
                             }, function(err){

                             });
                };

                $scope.unfollow = function(){
                  if(!session.isLoggedIn()){
                    return;
                  }
                  UserService.unfollow({name: $scope.targetuser.name}).$promise
                             .then(function(data){
                               $scope.targetuser.currentUserFollows = false;
                               $scope.targetuser.followers--;
                             }, function(err){

                             });
                };
            }]
        };
    }]);

});
