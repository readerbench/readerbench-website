/* global DemoTexts, DemoElements, encodeURIComponent, ServerSettings */
"use strict";

angular.module('controllers').controller('DemoSentimentAnalysisController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.title = DemoTexts.sentimentAnalysis.title;
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
        'dialogism': DemoElements.defaultDialogismOption
    };

    $scope.loading = false;
    $scope.sentiments = null;
    var sentimentIconMap = {
        'scared': 'confused',
        'angry': 'angry',
        'sad': 'sad',
        'happy': 'happy',
        'excited': 'shocked',
        'tender': 'heart'
    };
    $scope.getSentimentIcon = function (sentimentValence) {
        return sentimentIconMap[sentimentValence.valence];
    };
    $scope.changeSentimentGranularity = function ($event, selector, paragraphDelimiter) {
        jQuery('.paragraph-delimiter').hide();
        jQuery('.results-sentiment').find('ul.courses-filters > li > a').attr('class', '');
        jQuery($event.currentTarget).attr('class', 'current');
        jQuery('.hideable').hide();
        jQuery('.lesson-description').show();
        console.log(paragraphDelimiter);
        if(paragraphDelimiter === true) jQuery('.paragraph-delimiter').show();
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
    
    $scope.process = function () {
        $scope.loading = true;
        $scope.showResults = false;
        var params = buildCommonParams($scope.formData);
        $http
            .post(buildServerPath('sentiment-analysis'), params)
            .then(function (response) {
                $scope.loading = false;
                if (response.data.success !== true) {
                    alert('Server error occured!');
                    return;
                }
                $scope.showResults = true;
                $scope.sentiments = response.data.data.valences;
                $scope.text = response.data.data.text;
                $scope.children = response.data.data.children;
                var interval = setInterval(function () {
                    if ($scope.sentiments.count === response.data.data.valences.count) {
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
                        var documentColorRGB = computeColors(response.data.data, 0.1);
                        var documentColorHex = rgbToHex(documentColorRGB.r, documentColorRGB.g, documentColorRGB.b);
                        jQuery('.results-sentiment #document span.document').css('background-color', documentColorHex);
                        // compute paragraphs' colors
                        for (var i = 0; i < response.data.data.children.length; i++) {
                            var paragraph = response.data.data.children[i];
                            var paragraphColorRGB = computeColors(paragraph, 0.1);
                            var paragraphColorHex = rgbToHex(paragraphColorRGB.r, paragraphColorRGB.g, paragraphColorRGB.b);
                            jQuery('.results-sentiment #paragraph-' + i + ' span.paragraph').css('background-color', paragraphColorHex);
                            for (var j = 0; j < paragraph.children.length; j++) {
                                var sentence = paragraph.children[j];
                                var sentenceColorRGB = computeColors(sentence, 0.1);
                                var sentenceColorHex = rgbToHex(sentenceColorRGB.r, sentenceColorRGB.g, sentenceColorRGB.b);
                                jQuery('.results-sentiment #paragraph-' + i + ' #sentence-' + j + ' span.sentence').css('background-color', sentenceColorHex);
                                if (typeof sentence.children !== 'undefined') {
                                    for (var k = 0; k < sentence.children.length; k++) {
                                        var word = sentence.children[k];
                                        var wordColorRGB = computeColors(word, 0.1);
                                        var wordColorHex = rgbToHex(wordColorRGB.r, wordColorRGB.g, wordColorRGB.b);
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
    };
}]);