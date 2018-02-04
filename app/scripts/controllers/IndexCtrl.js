'use strict';
define(
	['paw2017a1frontend',
	'directives/notifications',
	'services/notificationsService',
	'services/autoCompleteService',
	'services/authService',
	'services/sessionService',
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
		'sessionService',
		function($scope, $location, notif, autoComplete, auth, baseUrl, session) {

			$scope.baseUrl = baseUrl;
			$scope.welcomeText = 'Welcome to your paw2017a1frontend page';
			$scope.isLoggedIn = auth.isLoggedIn();
			$scope.user = auth.getLoggedUser();
			$scope.showNavBar = true;

			if(!auth.isLoggedIn()){
				$location.path('/welcome');
			} else {
				$location.path('/');
			}

			$scope.logOut = function(){
				auth.logOut();
				$scope.isLoggedIn = false;
				$scope.user = null;
				$location.url('/welcome');
			};

			$scope.isSteamLinked = function(){
				return session.isSteamLinked();
			};

			$scope.logIn = function(){
				var curr = $location.path() != '/welcome' ? $location.path() : "/";
				$location.path('/login').search({
					next: curr
				});
			};

			$scope.changeAvatar = function(){
				var curr = $location.path() != '/welcome' ? $location.path() : "/";
				$location.path('/changeavatar').search({
					next: curr
				});
			};

			$scope.register = function(){
				var curr = $location.path() != '/welcome' ? $location.path() : "/";
				$location.path('/register').search({
					next: curr
				});
			};

			angular.element(function () {
				autoComplete.initialize();
			});

			$scope.$on('$locationChangeSuccess', function() {
        if($location.path() == '/login' || $location.path() == '/register'){
					$scope.showNavBar = false;
				} else {
					$scope.showNavBar = true;
				}
    	});

			$scope.$on('user:updated', function() {
				$scope.isLoggedIn = auth.isLoggedIn();
				$scope.user = auth.getLoggedUser();
			});

		}]);
});
