define(['paw2017a1frontend', 'directives/postView', 'services/MessageService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('RepliesCtrl', ['$scope', '$stateParams', 'MessageService', function($scope, $stateParams, MessageService) {
        
        MessageService.idMessageResource().get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.post = data;
        }, function(error) {
            
        });

        MessageService.idMessageResource().replies({id: $stateParams.id}, function(data) {
            $scope.replies = data;
        }, function(error) {

        })
    }]);

});