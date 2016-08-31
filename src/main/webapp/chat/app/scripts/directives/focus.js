'use strict';

/**
 * @ngdoc directive
 * @name directives.$focus
 *
 * @description
 * Listens for a `element:focus` event and focuses its element
 * if the event is for it.
 */
angular.module('directives')
.directive('focus', function () {
    return function (scope, elem, attrs) {
        scope.$on('element:focus', function (e, name) {
            if (attrs.focus === name) {
                elem[0].focus();
            }
        });
    };
});
