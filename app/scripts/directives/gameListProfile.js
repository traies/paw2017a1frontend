define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('gameListProfile', function() {
        return {
            restrict: 'E',
            scope: {
                games: '=games'
            },
            templateUrl: 'views/gameListProfile.html'
        }
    });
});