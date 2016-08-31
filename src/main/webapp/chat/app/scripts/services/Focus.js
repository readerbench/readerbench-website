'use strict';

/**
 * @ngdoc service
 * @name services.$focus
 *
 * @description
 * Sends an `element:focus` event to a directive which will focus its element.
 */
angular.module('services')
.factory('$focus', function ($timeout) {
    return function (scope, name, timeout) {
        $timeout(function () {
            scope.$broadcast('element:focus', name);
        }, timeout || 250);
    };
});
