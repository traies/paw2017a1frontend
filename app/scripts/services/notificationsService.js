'use strict';
define(['paw2017a1frontend','services/sessionService'], function(paw2017a1frontend) {

   return paw2017a1frontend.factory('notificationsService', ['$resource', 'sessionService','baseUrl',

   function($resource, session, baseUrl) {

      var NotificationsService = {};

      var notificationsResource = $resource(baseUrl + '/api/notifications/:id',
      {id:'@id'});

      NotificationsService._notifications = {
        notif: [],
        loaded: false,
        id: null
      };

      NotificationsService.getNotifications = function(){
        if(!session.isLoggedIn())
          return null;

        var user = session.getUser();
        var n = NotificationsService._notifications;

        if(!n.loaded || n.id != user.id){
          n.notif = null;
          NotificationsService.update();
          n.loaded = true;
          n.id = user.id;
        }
        return n.notif;
      };

      NotificationsService.update = function(){
        notificationsResource.query().$promise.then(function(response){
          NotificationsService._notifications.notif = response;
        });
      };

      NotificationsService.clear = function(){
        NotificationsService._notifications = {
          notif: [],
          loaded: false,
          id: null
        };
      };

      NotificationsService.delete = function(id){
        notificationsResource.delete({id: id});
      };

  		return NotificationsService;
	}]);

});
