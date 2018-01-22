'use strict';
define(['paw2017a1frontend','directives/notifications','services/autoCompleteService','services/authService','bloodhound','typeahead','typeahead-jquery'], function(paw2017a1frontend) {

	paw2017a1frontend.controller('IndexCtrl', ['$scope','$location','autoCompleteService','authService' ,function($scope,$location,autoComplete,auth) {

		$scope.welcomeText = 'Welcome to your paw2017a1frontend page';
		$scope.isLoggedIn = auth.isLoggedIn();
		$scope.user = auth.getLoggedUser();
		$scope.showNavBar = true;

		$scope.logOut = function(){
			auth.logOut();
			$scope.isLoggedIn = false;
			$scope.user = null;
			$location.url('/welcome');
		};

		$scope.$on('$viewContentLoaded', function() {
		   autoComplete.initialize();
		});


		$scope.$on('user:updated', function() {
			$scope.isLoggedIn = auth.isLoggedIn();
			$scope.user = auth.getLoggedUser();
		});

		$scope.$on('hideNavBar', function() {
			$scope.showNavBar = false;
		});

		$scope.$on('showNavBar', function() {
			$scope.showNavBar = true;
		});

	}]);
});
