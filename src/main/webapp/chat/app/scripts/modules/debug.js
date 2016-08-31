'use strict';

/**
 * If on debug mode, add a global function which displays the number
 * bindings
 */
angular.module('debug', [])
.run(['$window', 'config', function ($window, config) {
    if (config.features.debug) {
        $window.countBindings = function () {
            var $ = angular.element,
                root = $(document.getElementsByTagName('body'));
            var watchers = [];

            var f = function (element) {
                var data = element.data();
                if (_.has(data, ('$scope'))) {
                    angular.forEach(data.$scope.$$watchers, function (watcher) {
                        watchers.push(watcher);
                    });
                }

                angular.forEach(element.children(), function (childElement) {
                    f($(childElement));
                });
            };

            f(root);
            console.log(watchers.length + ' bindings');
        };
    }
}]);