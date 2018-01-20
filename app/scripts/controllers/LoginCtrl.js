define(['paw2017a1frontend','services/authService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('LoginCtrl', ['$scope','$location','authService','$rootScope',function($scope,$location,auth,$rootScope) {
    	$rootScope.$broadcast('hideNavBar');
        $scope.loginSubmit = function(loginUrl){
        	auth.logIn($scope.loginForm.username, $scope.loginForm.password, $scope.loginForm.rememberMe);
        	$rootScope.$broadcast('showNavBar');
        	if (loginUrl == undefined || loginUrl == null){
        		$location.path('/');
        	}else{
        		$location.path('loginUrl');
        	}
        }
    }]);

});