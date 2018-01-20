'use strict';
define(['paw2017a1frontend', 'services/authService'], function(paw2017a1frontend) {
		return paw2017a1frontend.factory('restService', ['$http', '$q' , 'authService', function($http, $q,  auth) {         			
			return {
				createUser: function(data) {
					auth.logIn(data.username,data.password);			
					return;
				}
			}
		}]);
	}
);