define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.service('UserService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        return $resource(baseUrl + "/api/user/:userId/games", {}, {
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
          }
        });
    }]);
});
