/* global DemoTexts, DemoElements, encodeURIComponent, ServerSettings */
"use strict";

angular.module('controllers').controller('DemoKeywordsController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.title = DemoTexts.keywords.title;
    $scope.text = DemoTexts.common.text;
    $scope.advanced = false;
    $scope.languages = DemoElements.languages;
    $scope.posTaggingOptions = DemoElements.posTaggingOptions;
    $scope.dialogismOptions = DemoElements.dialogismOptions;

    $scope.$watch('formData.language', function () {
        $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
        $scope.formData.lsa = DemoElements.defaultMetricOptions.lsa[$scope.formData.language.value];
        $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
        $scope.formData.lda = DemoElements.defaultMetricOptions.lda[$scope.formData.language.value];
        $scope.word2VecOptions = DemoElements.metricOptions.word2Vec[$scope.formData.language.value];
        $scope.formData.word2Vec = DemoElements.defaultMetricOptions.word2Vec[$scope.formData.language.value];
    });

    $scope.formData = {
        'text': DemoTexts.common.text,
        'language': DemoElements.defaultLanguage,
        'lsa': DemoElements.defaultMetricOptions.lsa.EN,
        'lda': DemoElements.defaultMetricOptions.lda.EN,
        'word2vec': DemoElements.defaultMetricOptions.word2Vec.EN,
        'posTagging': DemoElements.defaultPosTaggingOption,
        'dialogism': DemoElements.defaultDialogismOption,
        'threshold': DemoElements.defaultSemanticSimilarityThreshold
    };

    $scope.loading = false;
    $scope.topics = null;
    $scope.topicEdges = null;

    $scope.process = function () {
        $scope.loading = true;
        $scope.showResults = false;
        var params = buildCommonParams($scope.formData);
        params['threshold'] = $scope.formData.threshold;
        $http
            .post(buildServerPath('keywords'), params)
            .then(function (response) {
                $scope.loading = false;
                if (response.data.success !== true) {
                    alert('Server error occured!');
                    return;
                }
                $scope.showResults = true;
                $scope.topics = response.data.data.nodes;
                for (var i = 0; i < $scope.topics.length; i++) {
                    $scope.topics[i].showConnections = false;
                }
                // in the concept map draw only simple words, not bigrams
                $scope.topicEdges = response.data.data.links;
                $scope.conceptMap = {
                    nodes: [],
                    links: []
                };
                var keptNodes = [];
                var newIds = [];
                for (var i = 0; i < response.data.data.nodes.length; i++) {
                    if (response.data.data.nodes[i].pos.length <= 2) {
                        newIds[response.data.data.nodes[i].id] = $scope.conceptMap.nodes.length;
                        $scope.conceptMap.nodes[$scope.conceptMap.nodes.length] = response.data.data.nodes[i];
                        keptNodes[keptNodes.length] = response.data.data.nodes[i].id;
                    };
                };
                for (var i = 0; i < response.data.data.links.length; i++) {
                    if ((keptNodes.indexOf(response.data.data.links[i].source) !== -1) && (keptNodes.indexOf(response.data.data.links[i].target) !== -1)) {
                        var localLink = response.data.data.links[i];
                        localLink.source = newIds[localLink.source];
                        localLink.target = newIds[localLink.target];
                        $scope.conceptMap.links[$scope.conceptMap.links.length] = localLink;                        
                    }
                }
                var interval = setInterval(function () {
                    if ($scope.topicEdges.count === response.data.data.links.count) {
                        clearInterval(interval);
                        d3jsForTopics($scope.conceptMap, "#conceptMap", false);
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