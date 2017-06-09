/* global DemoTexts, DemoElements, encodeURIComponent, ServerSettings */
"use strict";

angular.module('controllers').controller('DemoSemanticSearchController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.title = DemoTexts.semanticSearch.title;
    $scope.text = DemoTexts.common.text;
    
    $scope.formData = {
        'text': DemoTexts.common.text
    };
    $scope.loading = false;
    $scope.search = null;

    $scope.process = function () {
        $scope.loading = true;
        $scope.showResults = false;

        var endpoint = 'semantic-search';
        var params = {
            text: encodeURIComponent($scope.formData.text).replace(/%0D/g, "%0A"),
            path: 'LAK_corpus/parsed-documents2'
        };
        $http
            .post(buildServerPath(endpoint), params)
            .then(function (response) {
                $scope.loading = false;
                if (response.data.success !== true) {
                    alert('Server error occured!');
                    return;
                }
                $scope.showResults = true;
                $scope.search = response.data.data;
                var interval = setInterval(function () {
                    if ($scope.search.count === response.data.data.count) {
                        clearInterval(interval);
                        courseDescriptionToggle();
                    }
                }, 1000);
            },
            function (response) {
                $scope.loading = false;
                if (response.status === 0) {
                    alert('Server error occured!');
                } else {
                    alert(response.statusText);
                }
            });
    };
}]);