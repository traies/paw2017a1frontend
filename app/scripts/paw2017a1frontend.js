'use strict';
define(['routes',
	'services/dependencyResolverFor',
	'i18n/i18nLoader!',
	'angular',
	'angular-resource',
	'angular-bootstrap',
	'bootstrap',
	'angular-translate',
	'angular-jwt',
	'angular-ui-router',
	'ng-file-upload'
	],
	function(config, dependencyResolverFor, i18n) {
		var paw2017a1frontend = angular.module('paw2017a1frontend', [
			'ngResource',
			'pascalprecht.translate',
			'ui.bootstrap',
			'angular-jwt',
			'ui.router',
			'ngFileUpload'
		]);
		paw2017a1frontend
			.config(
				['$controllerProvider',
				'$compileProvider',
				'$filterProvider',
				'$provide',
				'$translateProvider',
				'$httpProvider',
				'$logProvider',
				'$stateProvider',
				'$urlRouterProvider',
				function($controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider, $httpProvider, $logProvider, $stateProvider, $urlRouterProvider) {

					paw2017a1frontend.controller = $controllerProvider.register;
					paw2017a1frontend.directive = $compileProvider.directive;
					paw2017a1frontend.filter = $filterProvider.register;
					paw2017a1frontend.factory = $provide.factory;
					paw2017a1frontend.service = $provide.service;

					if (config.routes !== undefined) {
						angular.forEach(config.routes, function(route, name) {
							$stateProvider.state(name, {
								abstract: route.abstract,
								templateUrl: route.templateUrl,
								url: route.path,
								resolve: dependencyResolverFor(['controllers/' + route.controller]),
								controller: route.controller,
							});
						});
					}
					if (config.defaultRoutePath !== undefined) {
						$urlRouterProvider.otherwise(config.defaultRoutePath);
					}

					$translateProvider.translations('preferredLanguage', i18n);
					$translateProvider.preferredLanguage('preferredLanguage');

					var interceptor = ['sessionService', '$injector', '$q', '$location',

				    function(session, $injector, $q, $location) {

							return {

				       request: function (config) {

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
								 },

								 responseError: function(response){
									 var status = response.status;
									 var ex = ['/welcome', '/login', '/register'];

									 if(status == 401){
										 session.destroy();
										 var curr = !ex.includes($location.path()) ? $location.path() : "/";
										 $location.path('/login').search({
											 next: curr
										 });
									 }
									 return $q.reject(response);
								 }
							 };
				 	}];

					$httpProvider.interceptors.push(interceptor);

					$logProvider.debugEnabled(true);			//  TODO change in production
				}])
				.filter("trust", ['$sce', function($sce) {
  				return function(htmlCode){
    				return $sce.trustAsHtml(htmlCode);
  				}}])
				.constant('baseUrl','http://127.0.0.1:8080')
				.constant('maxPageHalf', 3)
				.constant('perPage', 10)	//  TODO change in production
				.constant('youtubePattern', /^(?:https:\/\/(?:www\.)?)?((?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?t=(?:[0-9]+m)?[0-9]+s)?)$/);

		return paw2017a1frontend;
	}
);
