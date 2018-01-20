'use strict';
define(['paw2017a1frontend','services/sessionService'], function(paw2017a1frontend) {

   return paw2017a1frontend.factory('authService', ['$http', 'sessionService', '$q', '$rootScope',  function($http,  session, $q, $rootScope) {
		var AuthService = {};
		AuthService.loggedUser = session.getUser();
		AuthService.logIn = function(username, password, rememberMe) {
			var self = this;
			session.setUser( {name:"Nicolas",id:'2',notifications:[]}, rememberMe);
			self.loggedUser = {name:"Nicolas",id:'2',notifications:[]};
			$rootScope.$broadcast('user:updated');
		};

		AuthService.isLoggedIn = function() {
			return !!this.loggedUser;
		};

		AuthService.logOut = function() {
			session.destroy();
			this.loggedUser = null;
		};

		AuthService.getLoggedUser = function() {
			return this.loggedUser;
		}
		return AuthService;
	}]);

});