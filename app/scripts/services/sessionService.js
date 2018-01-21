'use strict';
define(['paw2017a1frontend'], function(paw2017a1frontend) {


	paw2017a1frontend.factory('sessionService', function($window) {
		var Session = {};

		Session._user = JSON.parse($window.localStorage.getItem('session.user')) || JSON.parse($window.sessionStorage.getItem('session.user'));


		Session.getUser = function(){
			return this._user;
		};

		Session.setUser = function(user, rememberMe){
			this._user = user;
      this._rememberMe = rememberMe;
			if (rememberMe)
				$window.localStorage.setItem('session.user', JSON.stringify(user));
			else
				$window.sessionStorage.setItem('session.user', JSON.stringify(user));
			return this;
		};

    Session.updateUser = function(user){
      this._user = user;
      if (this._rememberMe)
        $window.localStorage.setItem('session.user', JSON.stringify(user));
      else
        $window.sessionStorage.setItem('session.user', JSON.stringify(user));
      return this;
    }


		Session.destroy = function destroy(){
			this.setUser(null);
			this.setUser(null, true);
		};


		return Session;
	});

});
