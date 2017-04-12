/* global DemoItems */
"use strict";

angular.module('controllers').controller('DemoMenuController', ['$location', '$scope', function ($location, $scope) {
    $scope.demoItems = DemoItems;
    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'current' : '';
    };
}]);