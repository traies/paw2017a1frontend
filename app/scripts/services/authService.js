'use strict';
define(['paw2017a1frontend','services/sessionService'], function(paw2017a1frontend) {

   return paw2017a1frontend.factory('authService', ['$http', 'sessionService', '$q', '$rootScope','jwtHelper',

   function($http,  session, $q, $rootScope,jwtHelper) {

    var AuthService = {};
		AuthService.loggedUser = session.getUser();

		AuthService.logIn = function(username, password, rememberMe) {
			var self = this;

      $http({
        method: 'POST',
        url: 'http://192.168.1.106:8080/api/login',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: {username: username, password: password}
      }).then(function (response) {
        console.log(response.headers()['x-auth-token']);
      });
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2YXBvciIsImV4cCI6MTUxNjU2NTQ3NiwidXNlcklkIjo0MiwiaWF0IjoxNTE2NTY0NTc2LCJqdGkiOiI5ODAxNmNjMDE4NWM5OWJiYWU3NjFkYjNiMzAwNTU2ZSIsInVzZXJuYW1lIjoiWmtheW9uIn0.Q5Hhqgx0547yhX7GhmFedpoGTxggqQFdjZvwaojBKC0';

    var tokenPayload = jwtHelper.decodeToken(token);
   console.log(tokenPayload);

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
