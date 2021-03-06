define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.service('SteamService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        return $resource(baseUrl + "/api/steam/details", {}, {
            confirm: {
                method: 'POST',
                url: baseUrl + "/api/steam/link",
                headers: {
                    "content-type": "application/json"
                },
            },
            getOwned: {
                method: 'GET',
                url: baseUrl + "/api/steam/owned",
                isArray: true,
            },
            getFriends: {
                method: 'GET',
                url: baseUrl + "/api/steam/friends",
                isArray: true,
            }
        });
    }]);
});