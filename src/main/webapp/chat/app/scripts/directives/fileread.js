'use strict';

/**
 * Directive used as an attribute for input type='file' for retriving the
 * uploaded file on change event.
 */
angular.module('directives')
.directive('fileread', function () {
    return {
        restrict: 'A',
        scope: {
            fileread: '='
        },
        link: function (scope, element) {
            element.bind('change', function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    };
});
