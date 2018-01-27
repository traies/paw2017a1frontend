define(
  ['paw2017a1frontend',
  'services/UserService',
  'services/authService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('RegisterCtrl',
    ['$scope',
    '$location',
    '$rootScope',
    'UserService',
    'authService',
    function($scope,$location,$rootScope, userService, auth) {

    	$rootScope.$broadcast('hideNavBar');

        $scope.url = '/';

        $scope.registerError = false;

        $scope.registerSubmit = function(registerUrl){

            $scope.url = registerUrl != null ? registerUrl : '/';

            $scope.resetErrors();

            if ($scope.registerForm.username.length < 6){
                 $scope.errorUserShort = true;
                 $scope.gotErrors = true;
            }else if($scope.registerForm.username.length > 255){
                 $scope.errorUserLong= true;
                 $scope.gotErrors = true;
            }

            if ($scope.registerForm.password.length < 6){
                 $scope.errorPasswordShort = true;
                 $scope.gotErrors = true;
            }else if($scope.registerForm.password.length > 255){
                 $scope.errorPasswordLong= true;
                 $scope.gotErrors = true;
            }

            if ($scope.registerForm.password != $scope.registerForm.repeatPassword){
                $scope.errorRepeat = true;
                 $scope.gotErrors = true;
            }

            if($scope.gotErrors)
                return;
        	//rest.createUser({username : $scope.registerForm.username, password: $scope.registerForm.password});

          userService.register({
            "username": $scope.registerForm.username,
            "password": $scope.registerForm.password,
            "repeatPassword": $scope.registerForm.password
          }).$promise.then(function(response){
            //now login
            $scope.registerError = false;
            var token = response.$httpHeaders('x-auth-token');

            auth.loginWithToken(token, false);
            $rootScope.$broadcast('showNavBar');
            $location.path($scope.url).replace();

          }, function(error){
            $scope.registerError = true;

          });



        }

        $scope.resetErrors = function(){
            $scope.errorUserLong = false;
            $scope.errorUserShort = false;
            $scope.errorDuplicateUser = false;
            $scope.errorInvalidUser = false;

            $scope.errorPasswordLong = false;
            $scope.errorPasswordShort = false;

            $scope.errorRepeat = false;

            $scope.gotErrors = false;

        };

        $scope.resetErrors();

    }]);

});
