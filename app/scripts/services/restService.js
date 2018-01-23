'use strict';
define(['paw2017a1frontend', 'services/authService'], function(paw2017a1frontend) {
		return paw2017a1frontend.factory('restService', ['$http', '$q' , '$resource', 'baseUrl', 'authService', function($http, $q, $resource, baseUrl, auth) {         			
			return {
				Game: $resource(baseUrl + "/api/game/:gameId", {gameId: '@id'}, {
					followers: {
						url: baseUrl + "/api/game/:gameId/followers",
						method: 'GET',
						isArray: true
					},
					feed: {
						url: baseUrl + "/api/game/:gameId/messages",
						method: 'GET',
						isArray: true,
					}
				}),

			}
		}]);
	}
);
