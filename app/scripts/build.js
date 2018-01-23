/* global paths */
'use strict';
require.config({
    baseUrl: '/scripts',
    paths: {
        alert: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
        angular: '../../bower_components/angular/angular',
        'angular-route': '../../bower_components/angular-route/angular-route',
        'angular-translate': '../../bower_components/angular-translate/angular-translate',
        button: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
        bloodhound: '../../bower_components/corejs-typeahead/dist/bloodhound',
        carousel: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel',
        collapse: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse',
        dropdown: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown',
        'es5-shim': '../../bower_components/es5-shim/es5-shim',
        jquery: '../../bower_components/jquery/dist/jquery',
        json3: '../../bower_components/json3/lib/json3',
        modal: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal',
        moment: '../../bower_components/moment/moment',
        popover: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover',
        requirejs: '../../bower_components/requirejs/require',
        scrollspy: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy',
        util: '../../bower_components/bootstrap/js/dist/util',
        tab: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab',
        tooltip: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
        typeahead: '../../bower_components/corejs-typeahead/dist/typeahead.bundle',
        'typeahead-jquery': '../../bower_components/corejs-typeahead/dist/typeahead.jquery',
        tether: '../../bower_components/tether/dist/js/tether',
        'corejs-typeahead': '../../bower_components/corejs-typeahead/dist/typeahead.bundle',
        'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-jwt': '../../bower_components/angular-jwt/dist/angular-jwt',
        'jwt-decode': '../../bower_components/jwt-decode/build/jwt-decode',
        'angular-resource': '../../bower_components/angular-resource/angular-resource',
        affix: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
        transition: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition'
    },
    shim: {
        angular: {
            deps: [
                'jquery'
            ]
        },
        'angular-bootstrap': {
            deps: [
                'angular'
            ]
        },
        'angular-jwt': {
            deps: [
                'angular'
            ]
        },
        'angular-route': {
            deps: [
                'angular'
            ]
        },
        'angular-resource': {
            deps: [
                'angular'
            ]
        },
        bootstrap: {
            deps: [
                'jquery',
                'modal'
            ]
        },
        modal: {
            deps: [
                'jquery'
            ]
        },
        tooltip: {
            deps: [
                'jquery'
            ]
        },
        typeahead: {
            deps: [
                'jquery'
            ]
        },
        bloodhound: {
            deps: [
                'jquery'
            ]
        },
        'typeahead-jquery': {
            deps: [
                'jquery'
            ]
        },
        'angular-translate': {
            deps: [
                'angular'
            ]
        }
    },
    packages: [

    ]
});

if (paths) {
    require.config({
        paths: paths
    });
}

require([
        'angular',
        'paw2017a1frontend',
        'controllers/IndexCtrl'
    ],
    function() {
        angular.bootstrap(document, ['paw2017a1frontend']);
    }
);
