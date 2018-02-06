/* global paths */
'use strict';
require.config({
    baseUrl: 'scripts',
    paths: {
        alert: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
        angular: '../../bower_components/angular/angular',
        'angular-translate': '../../bower_components/angular-translate/angular-translate',
        button: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
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
        tether: '../../bower_components/tether/dist/js/tether',
        'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-jwt': '../../bower_components/angular-jwt/dist/angular-jwt',
        'angular-resource': '../../bower_components/angular-resource/angular-resource',
        affix: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
        transition: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition',
        'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
        'bootstrap-sass': '../../bower_components/bootstrap-sass/assets/javascripts/bootstrap',
        'bootstrap-sass-official': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
        'angular-route': '../../bower_components/angular-route/angular-route',
        'ng-file-upload': '../../bower_components/ng-file-upload/ng-file-upload',
        'concrete-promise': '../../bower_components/concrete-promise/src/promise',
        'typeahead-jquery': '../../bower_components/typeahead.js/dist/typeahead.jquery',
        bloodhound: '../../bower_components/typeahead.js/dist/bloodhound',
        typeahead: '../../bower_components/typeahead.js/dist/typeahead.bundle',
        'angular-mocks': '../../bower_components/angular-mocks/angular-mocks'
    },
    shim: {
        angular: {
            deps: [
                'jquery'
            ]
        },
        'angular-bootstrap': {
            deps: [
                'angular',
                'tether-amd-wrapper'
            ]
        },
        'angular-jwt': {
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
                'modal',
                'tether-amd-wrapper'
            ]
        },
        modal: {
            deps: [
                'jquery'
            ]
        },
        'angular-translate': {
            deps: [
                'angular'
            ]
        },
        'angular-ui-router': {
            deps: [
                'angular'
            ]
        },
        'ng-file-upload': {
            deps: [
                'angular'
            ]
        },
        'typeahead-jquery': {
            deps: [
                'jquery'
            ],
            init: function ($) {
return require.s.contexts._.registry['typeahead.js'].factory( $ );
},
            bloodhound: {
                deps: [
                    'jquery'
                ],
                exports: 'Bloodhound'
            }
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
