/* global DemoTexts, DemoElements, encodeURIComponent, ServerSettings */
"use strict";

angular.module('controllers').controller('DemoSentimentAnalysisController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.title = DemoTexts.sentimentAnalysis.title;
    $scope.text = DemoTexts.common.text;
    $scope.advanced = false;
    $scope.languages = DemoElements.languages;
    $scope.posTaggingOptions = DemoElements.posTaggingOptions;
    $scope.dialogismOptions = DemoElements.dialogismOptions;
    $scope.granularities = DemoElements.granularities;

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
        'granularity': DemoElements.defaultGranularity,
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
    
    $scope.process = function () {
        $scope.loading = true;
        $scope.showResults = false;
        var params = buildCommonParams($scope.formData);
        params['granularity'] = $scope.formData.granularity.value;
        $http
            .post(buildServerPath('sentiment-analysis'), params)
            .then(function (response) {
                $scope.loading = false;
                if (response.data.success !== true) {
                    alert('Server error occured!');
                    return;
                }
                $scope.showResults = true;
                $scope.sentiments = response.data.data[0].valences;
                $scope.data = response.data.data;
                var interval = setInterval(function () {
                    if ($scope.sentiments.count === response.data.data[0].valences.count) {
                        clearInterval(interval);
                        animateProgressBar(jQuery('.results-sentiment div.progress-bar'));
                        jQuery('.results-sentiment a').each(function () {
                            jQuery(this)
                                .attr('title', jQuery(this).parent().find(" > .tooltip-content").html())
                                .tooltip('fixTitle').tooltip('show');
                        });
                        jQuery('.results-sentiment a').tooltip('hide');
                        for (var i = 0; i < response.data.data.length; i++) {
                            var rgb = computeColors(response.data.data[i], 0.1);
                            var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                            jQuery('.results-sentiment #text-' + i + ' span.body').css('background-color', hex);
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