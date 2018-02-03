'use strict';
define(['paw2017a1frontend'], function(paw2017a1frontend) {


	paw2017a1frontend.factory('sessionService', function($window) {
		var Session = {};

		Session.getUser = function(){
			//Give priority to the sessionStorage
			return JSON.parse($window.sessionStorage.getItem('session.user')) ||
						 JSON.parse($window.localStorage.getItem('session.user'));
		};

		Session.setUser = function(user){
			if (user.rememberMe) {
				$window.localStorage.setItem('session.user', JSON.stringify(user));
			} else {
				$window.sessionStorage.setItem('session.user', JSON.stringify(user));
			}
			return this;
		};

		Session.isLoggedIn = function(){
			return !!Session.getUser();
		};

    Session.updateUser = function(user){
      if (user.rememberMe){
        $window.localStorage.setItem('session.user', JSON.stringify(user));
      } else {
        $window.sessionStorage.setItem('session.user', JSON.stringify(user));
			}
      return this;
    }

		Session.destroy = function destroy(){
			if(Session.isLoggedIn()){
				if(Session.getUser().rememberMe){
						$window.localStorage.clear();
				} else {
						$window.sessionStorage.clear();
				}
			}
		};

		return Session;
	});

});
