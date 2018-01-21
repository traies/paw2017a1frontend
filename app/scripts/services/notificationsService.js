'use strict';
define(['paw2017a1frontend','services/sessionService'], function(paw2017a1frontend) {

   return paw2017a1frontend.factory('notificationsService', ['$resource', 'sessionService',

   function($resource, session) {

      var NotificationsService = {};

      var notificationsResource = $resource('http://192.168.1.106:8080/api/notifications/:id',
      {id:'@id'});

      NotificationsService.update = function(){
        session.getUser().notifications = notificationsResource.query();
      };

      NotificationsService.delete = function(id){
        notificationsResource.delete({id: id});
      }

  		return NotificationsService;
	}]);

});
