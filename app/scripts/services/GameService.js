define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.service('GameService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        return $resource(baseUrl + "/api/game/:gameId", {gameId: '@id'}, {
            followers: {
                url: baseUrl + "/api/game/:gameId/followers",
                method: 'GET',
                isArray: false
            },
            feed: {
                url: baseUrl + "/api/game/:gameId/messages",
                method: 'GET',
                isArray: true,
            },
            follow: {
                url: baseUrl + "/api/game/follow/:gameId",
                method: 'PUT'
            },
            unfollow: {
                url: baseUrl + "/api/game/unfollow/:gameId",
                method: 'PUT'
            }
        });
    }]);

});
