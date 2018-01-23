define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.service('ExploreService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        return $resource(baseUrl + "/api/explore/popular", {});
    }]);
});