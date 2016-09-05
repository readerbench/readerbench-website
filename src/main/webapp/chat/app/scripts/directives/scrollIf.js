'use strict';

/**
 *
 * @description
 * Scroll to current element.
 */
angular.module('directives')
.directive('scrollIf', function ($document, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            $timeout(function () {
                if (scope.$eval(attributes.scrollIf)) {
                    angular
                    .element($document[0].body)
                    .scrollTo(element[0].offsetTop - 50, 300);
                }
            });
        }
    };
});
