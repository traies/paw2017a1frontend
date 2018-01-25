define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.service('UserService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        return $resource(baseUrl + "/api/user/:name", {}, {
          register: {
            url: baseUrl + "/api/user",
            method: 'POST',
            headers: {
              "content-type": "application/json"
            },
            interceptor: {
              response: function(response) {
                response.resource.$httpHeaders = response.headers;
                return response.resource;
              }
            }
          },
          feed: {
            url: baseUrl + "/api/user/:name/messages",
            method: 'GET',
            isArray: true
          },
          followers: {
            url: baseUrl + "/api/user/:name/followers",
            method: 'GET',
            isArray: true
          },
          following: {
            url: baseUrl + "/api/user/:name/following",
            method: 'GET',
            isArray: true
          },
          gamesFollowing: {
            url: baseUrl + "/api/user/:name/games",
            method: 'GET',
            isArray: true
          },
        });
    }]);
});
