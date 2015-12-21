"use strict";

(function(){
	angular.module('readerbench', ['ngRoute', 'controllers', 'directives', 'filters'])
		.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
			
			 $httpProvider.defaults.headers.common = {};
			 $httpProvider.defaults.headers.post = {};
			 $httpProvider.defaults.headers.put = {};
			 $httpProvider.defaults.headers.patch = {};

			$routeProvider
				.when("/", {
					templateUrl: 'templates/home.html',
					controller: "HomeController"
				})
				.when("/demo", {
					templateUrl: 'templates/demo.html'
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
				.otherwise({
					redirectTo: "/"
				});
			
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