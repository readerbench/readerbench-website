"use strict";

angular.module('controllers').controller('DemoCvcoverController', ['$scope', '$http', '$sce', 'Upload', '$timeout', function ($scope, $http, $sce, Upload, $timeout) {

    var params = {};
    var endpoint = 'file-upload';
    $scope.uploadFile = function (type, file,
        errFiles, f, errFile, errorMsg) {
        $scope[f] = file;
        $scope[errFile] = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: buildServerPath(endpoint,
                    params),
                data: {
                    file: file
                }
            });

            file.upload
                .then(
                function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        switch (type) {
                            case 'CV':
                                $scope.formData.cv = file.result;
                                break;
                            case 'COVER':
                                $scope.formData.cover = file.result;
                                break;
                        }
                    });
                },
                function (response) {
                    if (response.status > 0)
                        $scope[errorMsg] = response.status
                            + ': '
                            + response.data;
                },
                function (evt) {
                    file.progress = Math
                        .min(
                        100,
                        parseInt(100.0
                            * evt.loaded
                            / evt.total));
                });
        }
    }

    // texts
    $scope.title = DemoTexts.cvCover.title;

    // options for selectable fields
    $scope.advanced = false;
    $scope.languages = DemoElements.languages;
    $scope.posTaggingOptions = DemoElements.posTaggingOptions;
    $scope.dialogismOptions = DemoElements.dialogismOptions;

    $scope
        .$watch(
        'formData.language',
        function () {
            $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
            $scope.formData.lsa = DemoElements.defaultMetricOptions.lsa[$scope.formData.language.value];
            $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
            $scope.formData.lda = DemoElements.defaultMetricOptions.lsa[$scope.formData.language.value];
        });

    $scope.formData = {
        language: DemoTexts.cvCover.language,
        lsa: DemoElements.defaultMetricOptions.lsa.FR,
        lda: DemoElements.defaultMetricOptions.lda.FR,
        posTagging: DemoElements.defaultPosTaggingOption,
        dialogism: DemoElements.defaultDialogismOption,
        threshold: DemoElements.defaultSemanticSimilarityThreshold
    };

    $scope.loading = false;

    $scope.topics = null;
    $scope.topicEdges = null;

    $scope.buttonClick = function (req) {

        $scope.showConceptMap = false;

        var endpoint;
        switch (req) {
            case 'CV_COVER':

                $scope.loading = true;

                endpoint = 'cvCoverProcessing';

                var data = {
                    cvFile: $scope.formData.cv,
                    coverFile: $scope.formData.cover,
                    lang: $scope.formData.language.name,
                    lsa: ServerSettings.configRoot + '/'
                    + $scope.formData.language.value + '/' + 'LSA' + '/'
                    + $scope.formData.lsa.value,
                    lda: ServerSettings.configRoot + '/'
                    + $scope.formData.language.value + '/' + 'LDA' + '/'
                    + $scope.formData.lda.value,
                    postagging: $scope.formData.posTagging.value,
                    dialogism: $scope.formData.dialogism.value,
                    threshold: $scope.formData.threshold
                };

                var params = {};

                $http
                    .post(
                    buildServerPath(
                        endpoint,
                        params), data)
                    .then(
                    function (response) {

                        $scope.loading = false;

                        if (response.data.success != true) {
                            alert('Server error occured!');
                            return;
                        }

                        // build concept map
                        $scope.showConceptMap = true;
                        // show sentiments
                        $scope.showSentiment = true;
                        if (typeof response.data.data.cv != 'undefined') {
                            $scope.cvTopics = response.data.data.cv.concepts.nodes;
                            $scope.cvTopicEdges = response.data.data.cv.concepts.links;
                            var intervalCvTopics = setInterval(
                                function () {
                                    if ($scope.cvTopicEdges.count == response.data.data.cv.concepts.links.count) {
                                        clearInterval(intervalCvTopics);
                                        d3jsForTopics(
                                            response.data.data.cv.concepts,
                                            "#conceptMapCv",
                                            false);
                                    }
                                }, 1000);

                            $scope.cvSentiments = response.data.data.cv.sentiments;
                            var intervalCvSentiments = setInterval(
                                function () {
                                    if ($scope.cvSentiments.count == response.data.data.cv.sentiments.count) {
                                        clearInterval(intervalCvSentiments);
                                        courseDescriptionToggle('#list-cv-sentiments');
                                    }
                                }, 1000);
                        }
                        if (typeof response.data.data.cover != 'undefined') {
                            $scope.coverTopics = response.data.data.cover.concepts.nodes;
                            $scope.coverTopicEdges = response.data.data.cover.concepts.links;
                            var intervalCoverTopics = setInterval(
                                function () {
                                    if ($scope.coverTopicEdges.count == response.data.data.cover.concepts.links.count) {
                                        clearInterval(intervalCoverTopics);
                                        d3jsForTopics(
                                            response.data.data.cover.concepts,
                                            "#conceptMapCover",
                                            false);
                                    }
                                }, 1000);

                            $scope.coverSentiments = response.data.data.cover.sentiments;
                            var intervalCoverSentiments = setInterval(
                                function () {
                                    if ($scope.coverSentiments.count == response.data.data.cover.sentiments.count) {
                                        clearInterval(intervalCoverSentiments);
                                        courseDescriptionToggle('#list-cover-sentiments');
                                    }
                                }, 1000);
                        }

                        $scope.showCommonWords = true;
                        $scope.commonWords = response.data.data.wordOccurences;
                        $scope.showSemanticSimilarity = true;
                        $scope.semanticSimilarity = response.data.data.similarity;

                    },
                    function (response) {

                        $scope.loading = false;

                        if (response.status == 0) {
                            alert('Server error occured!');
                        } else {
                            alert(response.statusText);
                        }

                    });
                break;
        }
    }

}])