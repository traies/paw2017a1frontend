'use strict';
define(['paw2017a1frontend', 'services/authService', 'services/notificationsService'], function(paw2017a1frontend) {

	paw2017a1frontend.directive('notifications', function() {
		return {
			restrict: 'E',
      replace: 'true',
			templateUrl: 'views/notifications.html',
      scope: {},
      controller:
        ['$scope',
        'authService',
        'notificationsService',
        function($scope, auth, notif){

          $scope.getNotifications = function(){
            return auth.getLoggedUser().notifications;
          };

          $scope.updateNotifications = function(){
            notif.update();
          };

        }]
		};
	});
});
