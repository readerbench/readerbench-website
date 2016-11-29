"use strict";

angular.module('controllers').controller('DemoSemanticAnnotationController', ['$scope', '$http', '$sce', 'Upload', '$timeout', function ($scope, $http, $sce, Upload, $timeout) {
    var params = {};
    var endpoint = 'fileUpload';
    $scope.uploadFile = function (file, errFiles, f,
        errFile, errorMsg) {
        $scope[f] = file;
        $scope[errFile] = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: buildServerPath(endpoint, params),
                data: {
                    file: file
                }
            });
            file.upload.then(
                function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        $scope.formData.file = file.result;
                    });
                },
                function (response) {
                    if (response.status > 0)
                        $scope[errorMsg] = response.status
                            + ': '
                            + response.data;
                },
                function (evt) {
                    file.progress = Math.min(
                        100,
                        parseInt(100.0 * evt.loaded / evt.total)
                    );
                }
            );
        }
    }

    // texts
    $scope.title = DemoTexts.semanticAnnotation.title;

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
            $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
        });

    // Semantic Annotation Form Data
    $scope.formData = {
        abstract: DemoTexts.semanticAnnotation.abstractText,
        keywords: DemoTexts.semanticAnnotation.keywords,
        language: DemoElements.defaultLanguage,
        lsa: DemoElements.defaultMetricOptions.lsa.English,
        lda: DemoElements.defaultMetricOptions.lda.English,
        posTagging: DemoElements.defaultPosTaggingOption,
        dialogism: DemoElements.defaultDialogismOption,
        threshold: DemoElements.defaultSemanticSimilarityThreshold
    };

    $scope.abstractDocumentSimilarity = -1;
    $scope.keywordsAbstractCoverage = -1;
    $scope.keywordsDocumentCoverage = -1;
    $scope.keywords = null;
    $scope.categories = null;

    $scope.loading = false;

    $scope.topics = null;
    $scope.topicEdges = null;
    $scope.search = null;
    $scope.uri = "";

    $scope.collaborationSocialKBNodes = null;
    $scope.collaborationVoiceOverlapNodes = null;

    $scope.buttonClick = function (req) {

        $scope.showSemanticRelevance = false;
        $scope.showSemanticCategories = false;

        var endpoint;
        switch (req) {

            case 'SEMANTIC_ANNOTATION':

                $scope.loading = true;

                endpoint = 'semanticProcess';

                var data = {
                    file: $scope.formData.file,
                    abstract: $scope.formData.abstract,
                    keywords: $scope.formData.keywords,
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
                }

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

                        $scope.showConcept = true;
                        $scope.showSemanticRelevance = true;
                        $scope.showSemanticCategories = true;

                        $scope.topics = response.data.data.concepts.nodes;
                        $scope.topicEdges = response.data.data.concepts.links;
                        $scope.abstractDocumentSimilarity = response.data.data.abstractDocumentSimilarity;
                        $scope.keywordsAbstractCoverage = response.data.data.keywordsAbstractCoverage;
                        $scope.keywordsDocumentCoverage = response.data.data.keywordsDocumentCoverage;
                        $scope.keywords = response.data.data.keywords;
                        $scope.categories = response.data.data.categories;

                        var interval = setInterval(
                            function () {
                                if ($scope.topicEdges.count == response.data.data.concepts.links.count) {
                                    clearInterval(interval);
                                    d3jsForTopics(
                                        response.data.data.concepts,
                                        "#conceptMap",
                                        false);
                                }
                            }, 1000);

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