'use strict';
define(['paw2017a1frontend'], function(paw2017a1frontend) {

    return paw2017a1frontend.factory('MessageService', ['$resource', 'baseUrl',
      function($resource, baseUrl) {
        var MessageService = {};

        var postMessageResource = $resource(baseUrl + '/api/message/:type/:media',
        { type:'@type',
          media: '@media'},
        {headers: {
          'content-type': 'application/json'
        }});

        MessageService.postResource = function(){
          return postMessageResource;
        };

        return MessageService;

      }]);

});
