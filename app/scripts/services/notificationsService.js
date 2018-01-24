'use strict';
define(['paw2017a1frontend','services/sessionService'], function(paw2017a1frontend) {

   return paw2017a1frontend.factory('notificationsService', ['$resource', 'sessionService','baseUrl',

   function($resource, session, baseUrl) {

      var NotificationsService = {};

      var notificationsResource = $resource(baseUrl + '/api/notifications/:id',
      {id:'@id'});

      NotificationsService.update = function(){
        notificationsResource.query().$promise.then(
          function(response){
            session.getUser().notifications = response;
          }
        );
      };

      NotificationsService.delete = function(id){
        notificationsResource.delete({id: id});
      }

  		return NotificationsService;
	}]);

});
