"use strict";

angular.module('controllers').controller('DemoSelfExplanationController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    // texts
    $scope.title = DemoTexts.selfExplanation.title;

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
        text: DemoTexts.selfExplanation.text,
        explanation: DemoTexts.selfExplanation.explanation,
        language: DemoTexts.selfExplanation.language,
        lsa: DemoElements.defaultMetricOptions.lsa.French,
        lda: DemoElements.defaultMetricOptions.lda.French,
        posTagging: DemoElements.defaultPosTaggingOption,
        dialogism: DemoElements.defaultDialogismOption
    };

    $scope.loading = false;

    $scope.buttonClick = function (req) {

        $scope.showReadingStrategies = false;

        var endpoint;
        switch (req) {
            case 'SELF_EXPLANATION':

                $scope.loading = true;

                endpoint = 'selfExplanation';
                var data = {
                    text: $scope.formData.text,
                    explanation: $scope.formData.explanation,
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

                        $scope.showReadingStrategies = true;
                        $scope.selfExplanationColored = $sce
                            .trustAsHtml(response.data.data.selfExplanationColored);
                        $scope.strategies = response.data.data.strategies;
                        var interval = setInterval(
                            function () {
                                if ($scope.strategies.count == response.data.data.strategies.count) {
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