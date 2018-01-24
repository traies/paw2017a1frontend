'use strict';

define([], function() {
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                name: 'Home',
                templateUrl: '/views/home.html',
                controller: 'HomeCtrl'
            },
            '/welcome': {
                name: 'Welcome',
                templateUrl: '/views/welcome.html',
                controller: 'WelcomeCtrl'
            },
            '/login': {
                name: 'Login',
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            },
            '/register': {
                name: 'Register',
                templateUrl: '/views/register.html',
                controller: 'RegisterCtrl'
            },
            '/game/:id': {
                name: 'Game',
                templateUrl: '/views/game.html',
                controller: 'GameCtrl'
            }
            /* ===== yeoman hook ===== */
            /* Do not remove these commented lines! Needed for auto-generation */
        }
    };
});
