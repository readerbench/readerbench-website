"use strict";
var app;

(function(){
    app = angular.module('readerbench', ['ngRoute', 'controllers', 'directives', 'filters']);
	app
		.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider){
			
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};

			$routeProvider
				.when("/", {
					templateUrl: 'templates/home.html'
				})
				.when("/demo", {
					templateUrl: 'templates/demo.html'
				})
					.when("/demo/text-processing", {
						templateUrl: 'templates/demo/text-processing.html'
					})
                    .when("/demo/sentiment-analysis", {
						templateUrl: 'templates/demo/sentiment-analysis.html'
					})
                    .when("/demo/textual-complexity", {
						templateUrl: 'templates/demo/textual-complexity.html'
					})
					.when("/demo/keywords", {
						templateUrl: 'templates/demo/keywords.html'
					})
                    .when("/demo/semantic-search", {
						templateUrl: 'templates/demo/semantic-search.html'
					})
                    .when("/demo/semantic-annotation", {
						templateUrl: 'templates/demo/semantic-annotation.html'
					})
					.when("/demo/self-explanation", {
						templateUrl: 'templates/demo/self-explanation.html'
					})
					.when("/demo/cscl", {
						templateUrl: 'templates/demo/cscl.html'
					})
					.when("/demo/cv-cover", {
						templateUrl: 'templates/demo/cv-cover.html'
					})
					.when("/demo/cv", {
						templateUrl: 'templates/demo/cv.html'
					})
					.when("/demo/vcop", {
						templateUrl: 'templates/demo/vcop.html'
					})
				.when("/contact", {
					templateUrl: 'templates/contact.html'
				})
				.when("/people", {
					templateUrl: 'templates/people.html'
				})
				.when("/projects", {
					templateUrl: 'templates/projects.html'
				})
				.when("/publications", {
					templateUrl: 'templates/publications.html'
				})
                .when("/map-builder", {
					templateUrl: 'templates/map-builder.html'
				})
				.otherwise({
					redirectTo: "/"
				});
			
				// use the HTML5 History API
	        	$locationProvider.html5Mode(true);
				$httpProvider.defaults.useXDomain = true;
	        	delete $httpProvider.defaults.headers.common['X-Requested-With'];
		}])
		.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
			try {
			   document.createEvent("TouchEvent");				   
			}
			catch (e) {				   
			   document.documentElement.className += " no-touch";
			}

		    var original = $location.path;
		    $location.path = function (path, reload) {
		        if (reload === false) {
		            var lastRoute = $route.current;
		            var un = $rootScope.$on('$locationChangeSuccess', function () {
		                $route.current = lastRoute;
		                un();
		            });
		        }
		        return original.apply($location, [path]);
		    };
		}])
})();