define(['paw2017a1frontend','services/authService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('LoginCtrl', ['$scope','$location','authService','$rootScope',function($scope,$location,auth,$rootScope) {

        $rootScope.$broadcast('hideNavBar');


        $scope.url = '/';
        $scope.loginFailed = false;

        $scope.loginSubmit = function(){
          var next = $location.search().next;
          $scope.url = next != null ? next : '/';
        	auth.logIn($scope.loginForm.username, $scope.loginForm.password, $scope.loginForm.rememberMe);
        };

        $scope.$on('login:ok', function() {
          $scope.loginFailed = false;
          $rootScope.$broadcast('showNavBar');
          $location.path($scope.url).replace();
        });

        $scope.$on('login:failed', function(){
          $scope.loginFailed = true;
        });




    }]);

});
