'use strict';

define([], function() {
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/home.html',
                controller: 'HomeCtrl'
            },
            '/welcome': {
                templateUrl: '/views/welcome.html',
                controller: 'WelcomeCtrl'
            },
            '/login': {
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            },
            '/register': {
                templateUrl: '/views/register.html',
                controller: 'RegisterCtrl'
            },
            '/game/:id': {
                templateUrl: '/views/game.html',
                controller: 'GameCtrl'
            }
            /* ===== yeoman hook ===== */
            /* Do not remove these commented lines! Needed for auto-generation */
        }
    };
});
