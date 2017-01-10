"use strict";

angular.module('controllers').controller('DemoTextProcessingController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    // texts
    $scope.title = DemoTexts.textProcessing.title;
    $scope.text = DemoTexts.textProcessing.text;

    // options for selectable fields
    $scope.advanced = false;
    $scope.languages = DemoElements.languages;
    $scope.posTaggingOptions = DemoElements.posTaggingOptions;
    $scope.dialogismOptions = DemoElements.dialogismOptions;

    $scope.$watch('formData.language', function () {
        $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
        $scope.lsa = DemoElements.defaultMetricOptions.lsa[$scope.formData.language.value];
        $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
        $scope.lda = DemoElements.defaultMetricOptions.lsa[$scope.formData.language.value];
    });

    // Text Processing Form Data
    $scope.formData = {
        text: DemoTexts.textProcessing.text,
        language: DemoElements.defaultLanguage,
        lsa: DemoElements.defaultMetricOptions.lsa.EN,
        lda: DemoElements.defaultMetricOptions.lda.EN,
        posTagging: DemoElements.defaultPosTaggingOption,
        dialogism: DemoElements.defaultDialogismOption,
        threshold: DemoElements.defaultSemanticSimilarityThreshold
    };

    $scope.loading = false;

    $scope.sentiments = null;
    $scope.complexity = null;
    $scope.topics = null;
    $scope.topicEdges = null;
    $scope.search = null;

    // TODO: add sentiment icons to sentiment results
    var sentimentIconMap = {
        scared: 'confused',
        angry: 'angry',
        sad: 'sad',
        happy: 'happy',
        excited: 'shocked',
        tender: 'heart'
    };
    $scope.getSentimentIcon = function (sentimentValence) {
        return sentimentIconMap[sentimentValence.content];
    };
    $scope.changeGranularity = function ($event, selector) {
        jQuery('.results-sentiment').find('ul.courses-filters > li > a').attr('class', '');
        jQuery($event.currentTarget).attr('class', 'current');
        jQuery('.hideable').hide();
        jQuery('.lesson-description').show();
        switch (selector) {
            case 'document':
                jQuery('.document-encapsulator > .hideable').show();
                break;
            case 'paragraph':
                jQuery('.paragraph-encapsulator > .hideable').show();
                break;
            case 'sentence':
                jQuery('.sentence-encapsulator > .hideable').show();
                break;
            case 'word':
                jQuery('.word-encapsulator > .hideable').show();
                break;
        }
    };

    $scope.buttonClick = function (req) {

        $scope.loading = true;
        $scope.showResults = 'NONE';

        var endpoint;

        switch (req) {

            case 'SENTIMENT_ANALYSIS':

                endpoint = 'getSentiment';

                var params = {
                    text: encodeURIComponent($scope.formData.text)
                        .replace(/%0D/g, "%0A"),
                    lang: $scope.formData.language.name,
                    lsa: ServerSettings.configRoot + '/'
                    + $scope.formData.language.value + '/' + 'LSA' + '/'
                    + $scope.formData.lsa.value,
                    lda: ServerSettings.configRoot + '/'
                    + $scope.formData.language.value + '/' + 'LDA' + '/'
                    + $scope.formData.lda.value,
                    postagging: $scope.formData.posTagging.value,
                    dialogism: $scope.formData.dialogism.value
                };

                $http
                    .get(buildServerPath(endpoint, params))
                    .then(function (response) {
                        $scope.loading = false;
                        if (response.data.success !== true) {
                            alert('Server error occured!');
                            return;
                        }

                        $scope.showResults = 'SENTIMENT_ANALYSIS';

                        $scope.sentiments = response.data.data;
                        var interval = setInterval(function () {
                            if ($scope.sentiments.count === response.data.data.count) {
                                clearInterval(interval);
                                //courseDescriptionToggle();
                                animateProgressBar(jQuery('.results-sentiment div.progress-bar'));
                                jQuery('.results-sentiment a').each(function () {
                                    jQuery(this)
                                        .attr('title', jQuery(this).parent().find(" > .tooltip-content").html())
                                        .tooltip('fixTitle').tooltip('show');
                                });
                                jQuery('.results-sentiment a').tooltip('hide');

                                // compute document color
                                var documentColorRGB = computeColors(response.data.data[0], 0.1);
                                var documentColorHex = rgbToHex(
                                    documentColorRGB.r,
                                    documentColorRGB.g,
                                    documentColorRGB.b
                                );
                                jQuery('.results-sentiment #document-0 span.document').css('background-color', documentColorHex);

                                // compute paragraphs' colors
                                for (var i = 0; i < response.data.data[0].innerObjects.length; i++) {
                                    var paragraph = response.data.data[0].innerObjects[i];
                                    var paragraphColorRGB = computeColors(paragraph, 0.1);
                                    var paragraphColorHex = rgbToHex(
                                        paragraphColorRGB.r,
                                        paragraphColorRGB.g,
                                        paragraphColorRGB.b
                                    );
                                    jQuery('.results-sentiment #paragraph-' + i + ' span.paragraph').css('background-color', paragraphColorHex);
                                    for (var j = 0; j < paragraph.innerObjects.length; j++) {
                                        var sentence = paragraph.innerObjects[j];
                                        var sentenceColorRGB = computeColors(sentence, 0.1);
                                        var sentenceColorHex = rgbToHex(
                                            sentenceColorRGB.r,
                                            sentenceColorRGB.g,
                                            sentenceColorRGB.b
                                        );
                                        jQuery('.results-sentiment #paragraph-' + i + ' #sentence-' + j + ' span.sentence').css('background-color', sentenceColorHex);

                                        if (typeof sentence.innerObjects !== 'undefined') {
                                            for (var k = 0; k < sentence.innerObjects.length; k++) {
                                                var word = sentence.innerObjects[k];
                                                var wordColorRGB = computeColors(word, 0.1);
                                                var wordColorHex = rgbToHex(
                                                    wordColorRGB.r,
                                                    wordColorRGB.g,
                                                    wordColorRGB.b
                                                );
                                                jQuery('.results-sentiment #paragraph-' + i + ' #sentence-' + j + ' #word-' + k + ' span.word').css('background-color', wordColorHex);
                                            }
                                        }
                                    }
                                }
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
                break;

            case 'TEXTUAL_COMPLEXITY':

                endpoint = 'getComplexity';

                var params = {
                    text: encodeURIComponent(
                        $scope.formData.text)
                        .replace(/%0D/g, "%0A"),
                    lang: $scope.formData.language.name,
                    lsa: ServerSettings.configRoot + '/'
                    + $scope.formData.language.value + '/' + 'LSA' + '/'
                    + $scope.formData.lsa.value,
                    lda: ServerSettings.configRoot + '/'
                    + $scope.formData.language.value + '/' + 'LDA' + '/'
                    + $scope.formData.lda.value,
                    postagging: $scope.formData.posTagging.value,
                    dialogism: $scope.formData.dialogism.value
                }

                $http
                    .get(
                    buildServerPath(
                        endpoint,
                        params))
                    .then(
                    function (response) {

                        $scope.loading = false;

                        if (response.data.success != true) {
                            alert('Server error occured!');
                            return;
                        }

                        $scope.showResults = 'TEXTUAL_COMPLEXITY';

                        $scope.complexity = response.data.data;
                        var interval = setInterval(
                            function () {
                                if ($scope.complexity.count == response.data.data.count) {
                                    clearInterval(interval);
                                    courseDescriptionToggle();
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

            case 'CONCEPT_MAP':

                endpoint = 'getTopics';

                var params = {
                    text: encodeURIComponent(
                        $scope.formData.text)
                        .replace(/%0D/g, "%0A"),
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

                $http
                    .get(
                    buildServerPath(
                        endpoint,
                        params))
                    .then(
                    function (response) {

                        $scope.loading = false;

                        if (response.data.success !== true) {
                            alert('Server error occured!');
                            return;
                        }

                        $scope.showResults = 'CONCEPT_MAP';

                        $scope.topics = response.data.data.nodes;
                        $scope.topicEdges = response.data.data.links;
                        var interval = setInterval(
                            function () {
                                if ($scope.topicEdges.count === response.data.data.links.count) {
                                    clearInterval(interval);
                                    d3jsForTopics(
                                        response.data.data,
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

            case 'SEMANTIC_SEARCH':

                endpoint = 'search';

                var params = {
                    text: encodeURIComponent(
                        $scope.formData.text)
                        .replace(/%0D/g, "%0A"),
                    path: 'tasa_search_en'
                }

                $http
                    .get(
                    buildServerPath(
                        endpoint,
                        params))
                    .then(
                    function (response) {

                        $scope.loading = false;

                        if (response.data.success != true) {
                            alert('Server error occured!');
                            return;
                        }

                        $scope.showResults = 'SEMANTIC_SEARCH';

                        $scope.search = response.data.data;
                        var interval = setInterval(
                            function () {
                                if ($scope.search.count == response.data.data.count) {
                                    clearInterval(interval);
                                    courseDescriptionToggle();
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