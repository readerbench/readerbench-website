"use strict";

angular.module('controllers').controller('MapBuilderController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.title = DemoTexts.mapBuilder.title;
    $scope.loading = false;

    $scope.topics = null;
    $scope.topicEdges = null;

    $scope.buttonClick = function () {
        $scope.loading = true;
        $scope.showResults = false;

        $scope.loading = false;
        $scope.showResults = true;

        var json = JSON.parse($scope.formData.text);
        $scope.topics = json.data.nodes;
        $scope.topicEdges = json.data.links;
        var interval = setInterval(
            function () {
                if ($scope.topicEdges.count === json.data.links.count) {
                    clearInterval(interval);
                    d3jsForTopics(
                        json.data,
                        "#conceptMap",
                        false);
                }
            }, 1000);
    };
}])