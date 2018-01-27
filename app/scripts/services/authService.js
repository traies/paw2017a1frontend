'use strict';
define(
  ['paw2017a1frontend',
  'services/sessionService',
  'services/notificationsService'],
  function(paw2017a1frontend) {

   return paw2017a1frontend.factory('authService',
   ['$http',
   'notificationsService',
   'sessionService',
   '$q',
   '$rootScope',
   'jwtHelper',
   'baseUrl',
   function($http, notif,  session, $q, $rootScope, jwtHelper, baseUrl) {

    var AuthService = {};

		AuthService.logIn = function(username, password, rememberMe) {
			var self = this;

      $http({
        method: 'POST',
        url: baseUrl + '/api/login',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: {username: username, password: password}
      }).then(function (response) {
        self.loginWithToken(response.headers()['x-auth-token'], rememberMe);
        $rootScope.$broadcast('login:ok');
      }, function(){
        $rootScope.$broadcast('login:failed');
      });

		};

    AuthService.loginWithToken = function(token, rememberMe){
      var self = this;
      var payload = jwtHelper.decodeToken(token);
      var user = {
        name: payload.username,
        id: payload.userId,
        token: token,
        tokenPayload: payload
      };
      session.setUser(user, rememberMe);
      $rootScope.$broadcast('user:updated');
    };

    AuthService.updateTokenData = function(token){
      var payload = jwtHelper.decodeToken(token);
      var user = {
        name: payload.username,
        id: payload.userId,
        token: token,
        tokenPayload: payload
      };
      session.updateUser(user);
      $rootScope.$broadcast('user:updated');
    };

		AuthService.isLoggedIn = function() {
			return !!session.getUser();
		};

		AuthService.logOut = function() {
			session.destroy();
		};

		AuthService.getLoggedUser = function() {
			return session.getUser();
		};
    
		return AuthService;
	}]);

});
