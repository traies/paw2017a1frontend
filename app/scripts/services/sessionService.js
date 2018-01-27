'use strict';
define(['paw2017a1frontend'], function(paw2017a1frontend) {


	paw2017a1frontend.factory('sessionService', function($window) {
		var Session = {};

		Session.getUser = function(){
			return JSON.parse($window.localStorage.getItem('session.user')) || JSON.parse($window.sessionStorage.getItem('session.user'));
		};

		Session.setUser = function(user, rememberMe){
			$window.localStorage.setItem('session.remember.me', rememberMe);
			if (rememberMe)
				$window.localStorage.setItem('session.user', JSON.stringify(user));
			else
				$window.sessionStorage.setItem('session.user', JSON.stringify(user));
			return this;
		};

		Session.isLoggedIn = function(){
			return !!Session.getUser();
		};

    Session.updateUser = function(user){
      if ($window.localStorage.getItem('session.remember.me') || false)
        $window.localStorage.setItem('session.user', JSON.stringify(user));
      else
        $window.sessionStorage.setItem('session.user', JSON.stringify(user));
      return this;
    }

		Session.destroy = function destroy(){
			$window.localStorage.setItem('session.remember.me', null);
			$window.localStorage.setItem('session.user', null);
			$window.sessionStorage.setItem('session.user', null);
		};

		return Session;
	});

});
