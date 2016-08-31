'use strict';

angular.module('directives')
.directive('uiAlert', function ($timeout, Alert, Templates) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: Templates.alert,
        compile: function () {
            return {
                pre: function (scope) {
                    scope.show = false;
                },
                post: function (scope, element) {
                    var timeoutId = null;
                    scope.Alert = Alert;

                    scope.$watch('Alert.newAlert', function (newValue) {
                        if (Alert.newAlert === null) {
                            return;
                        }
                        scope.show = false;
                        $timeout(function () { scope.show = true; }, 0);
                        if (timeoutId) {
                            $timeout.cancel(timeoutId);
                        }
                        timeoutId = $timeout(function () {
                            scope.show = false;
                        }, 5000);
                    });

                    scope.close = function () {
                        scope.show = false;
                    };
                }
            };
        }
    };
});
