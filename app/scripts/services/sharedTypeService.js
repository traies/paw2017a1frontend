define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.service('sharedTypeService', function() {
        var shared = {type: 'message'};

        return {
            getType: function() {
                return shared;
            },
            setType: function(object) {
                shared.type = object;
            }
        }
    });

});