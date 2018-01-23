'use strict';
define(['routes',
	'services/dependencyResolverFor',
	'i18n/i18nLoader!',
	'angular',
	'angular-route',
	'angular-resource',
	'angular-bootstrap',
	'bootstrap',
	'angular-translate',
	'angular-jwt'
	],
	function(config, dependencyResolverFor, i18n) {
		var paw2017a1frontend = angular.module('paw2017a1frontend', [
			'ngRoute',
			'ngResource',
			'pascalprecht.translate',
			'ui.bootstrap',
			'angular-jwt'
		]);
		paw2017a1frontend
			.config(
				['$routeProvider',
				'$controllerProvider',
				'$compileProvider',
				'$filterProvider',
				'$provide',
				'$translateProvider',
				'$httpProvider',
				function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider, $httpProvider) {

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

					var interceptor = ['sessionService', '$injector',

				    function(session, $injector) {

							return {

				       request: function (config) {
				           // This is the authentication service that I use.
				           // I store the bearer token in the local storage and retrieve it when needed.
				           // You can use your own implementation for this
				           var user = session.getUser();

				           if (user != null) {
				               config.headers['Authorization'] = 'Bearer '+ user.token;
				           }

				           return config;
				         },

								 response: function (response){
									 /*
									 ** Need to inject this way because of
									 **	a circular dependency on $http
									 */
									 var auth = $injector.get('authService');

									 var token = response.headers('x-auth-token');

									 if(auth.isLoggedIn() && token != null){
										 auth.updateTokenData(token);
									 }


									 return response;
								 }

							 };
				 	}];

					$httpProvider.interceptors.push(interceptor);
				}])
				.constant('baseUrl','http://127.0.0.1:8080');
		return paw2017a1frontend;
	}
);
