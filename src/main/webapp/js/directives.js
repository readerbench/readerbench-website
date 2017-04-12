"use strict";

(function() {
	angular
		.module('directives', [ 'services' ])
		.directive('readerMenu', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/reader-menu.html'
			}
		} ])
		.directive('aboutSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/about-section.html'
			}
		} ])
		.directive('browseSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/browse-section.html'
			}
		} ])
		.directive('carouselSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/carousel-section.html'
			}
		} ])
        .directive('demoTextProcessingSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/demo/text-processing-section.html'
			}
		} ])
        .directive('demoSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/demo/section.html'
			}
		} ])
        .directive('demoCommonInputFields', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/demo/common-input-fields.html'
			}
		} ])
		.directive('peopleSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/people-section.html'
			}
		} ])
		.directive('projectsSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/projects-section.html'
			}
		} ])
		.directive('publicationsSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/publications-section.html'
			}
		} ])
		.directive('contactSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/contact-section.html'
			}
		} ])
        .directive('mapbuilderSection', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/mapbuilder-section.html'
			}
		} ])
		.directive('actionBox', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/action-box.html'
			}
		} ])
		.directive('readerHeader', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/reader-header.html',
				link: function(scope, element, attrs, window){

				}
			}
		} ])
        .directive('demoTextProcessingMenu', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/demo/text-processing-menu.html'
			}
		} ])
		.directive('demoMenu', [ function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/directives/demo/menu.html'
			}
		} ]);
})();