'use strict';
define(
	['paw2017a1frontend',
	'directives/notifications',
	'services/notificationsService',
	'services/autoCompleteService',
	'services/authService',
	'bloodhound',
	'typeahead',
	'typeahead-jquery'],
	function(paw2017a1frontend) {

		paw2017a1frontend.controller('IndexCtrl',
		['$scope',
		'$location',
		'notificationsService',
		'autoCompleteService',
		'authService',
		'baseUrl',
		function($scope, $location, notif, autoComplete, auth, baseUrl) {

			$scope.baseUrl = baseUrl;
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

			$scope.logIn = function(){
				var curr = $location.path();
				$location.path('/login').search({
					next: curr
				});
			};

			$scope.register = function(){
				var curr = $location.path();
				$location.path('/register').search({
					next: curr
				});
			};

			angular.element(function () {
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
