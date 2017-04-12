/* global DemoTexts, DemoElements, encodeURIComponent, ServerSettings, DemoTextProcessingItems */
"use strict";

angular.module('controllers').controller('DemoTextProcessingController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.title = DemoTexts.textProcessing.title;
}]);