"use strict";

angular.module('controllers')
    .controller('DemoCvController', ['$scope', '$http', '$sce', 'Upload', '$timeout', function ($scope, $http, $sce, Upload, $timeout) {
    $scope.fileUploaded = false;
    jQuery('#submit-button').prop("disabled", true);
    var params = {};
    var endpoint = 'fileUpload';
    $scope.uploadFile = function (type, file,
        errFiles, f, errFile, errorMsg) {
        $scope.fileUploaded = false;
        $scope.errors = null;
        $scope.warnings = null;
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
                        if (response.data.data.errors.length > 0) $scope.errors = response.data.data.errors;
                        if (response.data.data.warnings.length > 0) $scope.warnings = response.data.data.warnings;
                        file.result = response.data.data.name;
                        $scope.fileUploaded = true;
                        jQuery('#submit-button').prop("disabled", false);
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
                        .min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
        }
    }

    // texts
    $scope.title = DemoTexts.cv.title;

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

    $scope.formData = {
        keywords: DemoTexts.cv.keywords,
        ignore: DemoTexts.cv.ignore,
        language: DemoTexts.cv.language,
        lsa: DemoElements.defaultMetricOptions.lsa.French,
        lda: DemoElements.defaultMetricOptions.lda.French,
        posTagging: DemoElements.defaultPosTaggingOption,
        dialogism: DemoElements.defaultDialogismOption,
        threshold: DemoElements.defaultSemanticSimilarityThreshold
    };

    $scope.loading = false;
    $scope.topics = null;
    $scope.topicEdges = null;

    $scope.buttonClick = function (req) {
        if ($scope.fileUploaded === false) return;
        $scope.showConceptMap = false;
        $scope.showText = false;
        $scope.showProcessedText = false;
        var endpoint;
        switch (req) {
            case 'CV_COVER':
                $scope.loading = true;
                endpoint = 'cvProcessing';
                var data = {
                    cvFile: $scope.formData.cv,
                    keywords: $scope.formData.keywords,
                    ignore: $scope.formData.ignore,
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
                    .post(buildServerPath(endpoint, params), data)
                    .then(function (response) {
                        $scope.loading = false;
                        if (response.data.success !== true) {
                            alert('Server error occured!');
                            return;
                        }

                        if (typeof response.data.data.text !== 'undefined')
                            $scope.text = '<p>' + response.data.data.text.replace(/\n/g, "</p><p>") + '</p>';
                        if (typeof response.data.data.processedText !== 'undefined')
                            $scope.processedText = '<p>' + response.data.data.processedText.replace(/\n/g, "</p><p>") + '</p>';

                        // build concept map
                        $scope.showConceptMap = true;
                        $scope.topics = response.data.data.concepts.nodes;
                        $scope.topicEdges = response.data.data.concepts.links;
                        var intervalCvTopics = setInterval(
                            function () {
                                if ($scope.topicEdges.count === response.data.data.concepts.links.count) {
                                    clearInterval(intervalCvTopics);
                                    d3jsForTopicsForvCop(
                                        response.data.data.concepts,
                                        "#conceptMapCv",
                                        false);
                                }
                            }, 1000);

                        // show textual
                        // complexity
                        $scope.showComplexity = true;
                        $scope.complexity = response.data.data.textualComplexity;
                        var intervalComplexity = setInterval(
                            function () {
                                if ($scope.complexity.count === response.data.data.textualComplexity.count) {
                                    clearInterval(intervalComplexity);
                                    courseDescriptionToggle('#textual-complexity');
                                }
                            }, 1000);

                        $scope.showStats = true;
                        $scope.pages = response.data.data.pages;
                        $scope.paragraphs = response.data.data.paragraphs;
                        $scope.sentences = response.data.data.sentences;
                        $scope.words = response.data.data.words;
                        $scope.contentWords = response.data.data.contentWords;
                        $scope.colors = response.data.data.colors;
                        $scope.images = response.data.data.images;
                        $scope.boldCharsCoverage = response.data.data.boldCharsCoverage;
                        $scope.italicCharsCoverage = response.data.data.italicCharsCoverage;
                        $scope.boldItalicCharsCoverage = response.data.data.boldItalicCharsCoverage;

                        $scope.showWords = true;
                        $scope.positiveWords = response.data.data.positiveWords;
                        $scope.negativeWords = response.data.data.negativeWords;

                        // show LIWC
                        // valences
                        $scope.showValences = true;
                        $scope.liwcEmotions = response.data.data.liwcEmotions;
                        var intervalLiwc = setInterval(
                            function () {
                                if ($scope.liwcEmotions.count === response.data.data.liwcEmotions.count) {
                                    clearInterval(intervalLiwc);
                                    courseDescriptionToggle('#liwc-sentiments');
                                }
                            }, 1000);

                        $scope.showSemanticRelevance = true;
                        // specific keywords
                        $scope.keywords = response.data.data.keywords;
                        // keywords document
                        // relevance
                        $scope.keywordsDocumentCoverage = response.data.data.keywordsDocumentRelevance;

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