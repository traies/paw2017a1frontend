define(['paw2017a1frontend','services/restService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('RegisterCtrl', ['$scope','$location','restService','$rootScope',function($scope,$location,rest,$rootScope) {

    	$rootScope.$broadcast('hideNavBar');
        $scope.registerSubmit = function(registerUrl){
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
        	rest.createUser({username : $scope.registerForm.username, password: $scope.registerForm.password});
        	$rootScope.$broadcast('showNavBar');
        	if (registerUrl == undefined || registerUrl == null){
        		$location.path('/');
        	}else{
        		$location.path('registerUrl');
        	}
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