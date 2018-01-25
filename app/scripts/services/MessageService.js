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

        var idMessageResource = $resource(baseUrl + '/api/message/:id',{id: '@id'},{
          share: {
            url: baseUrl + "/api/message/share/:id",
            method: 'PUT',
          },
          unshare: {
            url: baseUrl + "/api/message/unshare/:id",
            method: 'PUT'
          }
        });

        MessageService.postResource = function(){
          return postMessageResource;
        };

        MessageService.idMessageResource = function(){
          return idMessageResource;
        };

        return MessageService;

      }]);

});
