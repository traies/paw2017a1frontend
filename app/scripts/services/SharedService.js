define(['paw2017a1frontend'], function(paw2017a1frontend) {
    'use strict';
    paw2017a1frontend.service('SharedService', function() {
        var shared = {};

        return {
            get: function() {
                return shared;
            },
            set: function(key, value) {
                shared[key] = value;
            }
        }
    });
});