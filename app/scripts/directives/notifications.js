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
				'$location',
        'sessionService',
        'notificationsService',
        function($scope, $location, session, notif){

          $scope.getNotifications = function(){
            return notif.getNotifications();
          };

          $scope.updateNotifications = function(){
            notif.update();
          };

					$scope.delete = function(id){
						var i = 0;
						var notifications = notif.getNotifications();
						for(; i < notifications.length; i++){
							if(notifications[i].id == id)
								break;
						}
						notifications.splice(i, 1);
						notif.delete(id);
					};

					$scope.goToUserProfile = function(id, tgtName){
						$scope.delete(id);
						$location.path('/user/' + tgtName + '/messages');
					};

        }]
		};
	});
});
