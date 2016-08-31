'use strict';

/**
 * @description
 * Scrolls to a given section in the dashboard.
 */
angular.module('controllers')
.directive('scrollToDashboardSection', function ($document, $stateParams, $timeout) {
    return {
        restrict: 'A',
        link: function (scope) {
            var section = $stateParams.section, timeoutId;

            timeoutId = $timeout(function () {
                var element = $document[0].querySelector('#' + section);

                if (element) {
                    angular.element($document[0].body).scrollTop(element.offsetTop, 300);
                }
            }, 100);

            scope.$on('$destroy', function () {
                $timeout.cancel(timeoutId);
            });
        }
    };
});
