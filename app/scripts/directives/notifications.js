'use strict';
define(['paw2017a1frontend', 'services/sessionService', 'services/notificationsService'], function(paw2017a1frontend) {

	paw2017a1frontend.directive('notifications', function() {
		return {
			restrict: 'E',
      replace: 'true',
			templateUrl: 'views/notifications.html',
      scope: {},
      controller:
        ['$scope',
        'sessionService',
        'notificationsService',
        function($scope, session, notif){

          $scope.getNotifications = function(){
            return session.getUser().notifications;
          };

          $scope.updateNotifications = function(){
            notif.update();
          };

        }]
		};
	});
});
