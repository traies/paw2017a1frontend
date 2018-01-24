define(['paw2017a1frontend', 'directives/gameProfile', 'directives/gameFeed'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameCtrl', ['$scope', '$state','$log', function($scope, $state, $log) {
        
        switch ($state.current.name) {
            case 'Game.followers':
                $scope.type = 'followers';
                break;
            case 'Game.messages':
                $scope.type = 'messages';
                break;
        }
    }]);
});