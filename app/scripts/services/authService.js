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
   function($http, notif,  session, $q, $rootScope,jwtHelper) {

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
        var payload = jwtHelper.decodeToken(response.headers()['x-auth-token']);
        var user = {
          name: payload.username,
          id: payload.userId,
          token: response.headers()['x-auth-token'],
          tokenPayload: payload,
          notifications: []
        };
        session.setUser(user, rememberMe);
        self.loggedUser = user;
        //Todo: see if can trigger this when event
        //fired or once in a while
        notif.update();
        $rootScope.$broadcast('user:updated');
        $rootScope.$broadcast('login:ok');
      }, function(){
        $rootScope.$broadcast('login:failed');
      });

		};

    AuthService.updateTokenData = function(token){
      var payload = jwtHelper.decodeToken(token);
      var user = {
        name: payload.username,
        id: payload.userId,
        token: token,
        tokenPayload: payload,
        notifications: session.getUser().notifications
      };
      session.updateUser(user);
      self.loggedUser = user;
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
