/* global DemoTextProcessingItems */
"use strict";

angular.module('controllers').controller('DemoTextProcessingMenuController', ['$location', '$scope', function ($location, $scope) {
    $scope.demoTextProcessingItems = DemoTextProcessingItems;
    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'current' : '';
    };
}]);