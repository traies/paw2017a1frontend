define(['paw2017a1frontend','services/authService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('LoginCtrl', ['$scope','$location','authService','$rootScope',function($scope,$location,auth,$rootScope) {


        $rootScope.$broadcast('hideNavBar');

        //will change this
        $scope.url = '/';

        $scope.loginFailed = false;

        $scope.loginSubmit = function(loginUrl){
          $scope.url = loginUrl != null ? loginUrl : '/';
        	auth.logIn($scope.loginForm.username, $scope.loginForm.password, $scope.loginForm.rememberMe);
        };

        $scope.$on('login:ok', function() {
          $scope.loginFailed = false;
          $rootScope.$broadcast('showNavBar');
          $location.path($scope.url);
        });

        $scope.$on('login:failed', function(){
          $scope.loginFailed = true;
        });




    }]);

});
