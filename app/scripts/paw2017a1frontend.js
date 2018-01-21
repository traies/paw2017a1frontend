'use strict';
define(['routes',
	'services/dependencyResolverFor',
	'i18n/i18nLoader!',
	'angular',
	'angular-route',
	'angular-bootstrap',
	'bootstrap',
	'angular-translate',
	'jwt-decode'],
	function(config, dependencyResolverFor, i18n) {
		var paw2017a1frontend = angular.module('paw2017a1frontend', [
			'ngRoute',
			'pascalprecht.translate',
			'ui.bootstrap'
		]);
		paw2017a1frontend
			.config(
				['$routeProvider',
				'$controllerProvider',
				'$compileProvider',
				'$filterProvider',
				'$provide',
				'$translateProvider',
				function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider) {

					paw2017a1frontend.controller = $controllerProvider.register;
					paw2017a1frontend.directive = $compileProvider.directive;
					paw2017a1frontend.filter = $filterProvider.register;
					paw2017a1frontend.factory = $provide.factory;
					paw2017a1frontend.service = $provide.service;

					if (config.routes !== undefined) {
						angular.forEach(config.routes, function(route, path) {
							$routeProvider.when(path, {templateUrl: route.templateUrl, resolve: dependencyResolverFor(['controllers/' + route.controller]), controller: route.controller, gaPageTitle: route.gaPageTitle});
						});
					}
					if (config.defaultRoutePath !== undefined) {
						$routeProvider.otherwise({redirectTo: config.defaultRoutePath});
					}

					$translateProvider.translations('preferredLanguage', i18n);
					$translateProvider.preferredLanguage('preferredLanguage');
				}]);
		return paw2017a1frontend;
	}
);
