'use strict';

define([], function() {
    return {
        defaultRoutePath: '/',
        routes: {
            'Home': {
                path: '/',
                templateUrl: '/views/home.html',
                controller: 'HomeCtrl'
            },
            'Welcome': {
                path: '/welcome',
                templateUrl: '/views/welcome.html',
                controller: 'WelcomeCtrl'
            },
            'Login': {
                path: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            },
            'Register': {
                path: '/register',
                templateUrl: '/views/register.html',
                controller: 'RegisterCtrl'
            },
            'Game': {
                abstract: true,
                path: '/game/:id',
                templateUrl: '/views/game.html',
                controller: 'GameCtrl'
            },
            'Game.followers': {
                path: '/followers',
                templateUrl: 'views/gameFollowers.html',
                controller: 'GameFollowersCtrl'
            },
            'Game.messages': {
                path: '/messages' ,
                templateUrl: 'views/gameFeed.html',
                controller: 'GameFeedCtrl'
            },
            'user': {
                abstract: true,
                path: '/user/:name' ,
                templateUrl: '/views/user.html',
                controller: 'UserCtrl'
            },
            'user.followers': {
                path: '/followers',
                templateUrl: 'views/userFollowers.html',
                controller: 'UserFollowersCtrl'
            },
            'user.messages': {
                path: '/messages' ,
                templateUrl: 'views/userFeed.html',
                controller: 'UserFeedCtrl'
            },
            'user.following': {
                path: '/following' ,
                templateUrl: 'views/userFollowers.html',
                controller: 'UserFollowingCtrl'
            }
            /* ===== yeoman hook ===== */
            /* Do not remove these commented lines! Needed for auto-generation */
        }
    };
});
