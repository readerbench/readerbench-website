"use strict";

angular.module('controllers').controller('DemoCsclController', ['$scope', '$http', '$sce', 'Upload', '$timeout', function ($scope, $http, $sce, Upload, $timeout) {
    $scope.fileUploaded = false;
    jQuery('#submit-button').prop("disabled", true);
    var params = {};
    var endpoint = 'fileUpload';
    $scope.uploadFile = function (file, errFiles, f,
        errFile, errorMsg) {
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
                        $scope.formData.csclFile = file.result;
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
    $scope.title = DemoTexts.csclProcessing.title;

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
            $scope.lsa = DemoElements.defaultMetricOptions.lsa[$scope.formData.language.value];
            $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
            $scope.lda = DemoElements.defaultMetricOptions.lsa[$scope.formData.language.value];
        });

    $scope.sampleFileUrl = DemoTexts.csclProcessing.sampleFileUrl;
    $scope.formData = {
        language: DemoElements.defaultLanguage,
        lsa: DemoElements.defaultMetricOptions.lsa.EN,
        lda: DemoElements.defaultMetricOptions.lda.EN,
        posTagging: DemoElements.defaultPosTaggingOption,
        dialogism: DemoElements.defaultDialogismOption,
        threshold: DemoElements.defaultSemanticSimilarityThreshold
    };

    $scope.loading = false;

    $scope.topics = null;
    $scope.topicEdges = null;

    $scope.collaborationSocialKBNodes = null;
    $scope.collaborationVoiceOverlapNodes = null;

    $scope.buttonClick = function (req) {

        $scope.showParticipantInteractionMap = false;
        $scope.showParticipantCsclIndices = false;
        $scope.showParticipantEvolutionGraph = false;
        $scope.showCollaborationGraphs = false;
        $scope.showConceptMap = false;

        var endpoint;
        switch (req) {
            case 'CSCL':

                $scope.loading = true;

                endpoint = 'csclProcessing';

                var data = {
                    csclFile: $scope.formData.csclFile,
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
                        $scope.topics = response.data.data.concepts.nodes;
                        $scope.topicEdges = response.data.data.concepts.links;
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

                        // build participant
                        // interaction
                        // concept map
                        $scope.showParticipantInteractionMap = true;
                        $scope.participants = response.data.data.participantInteraction.nodes;
                        $scope.participantEdges = response.data.data.participantInteraction.links;
                        var intervalParticipantInteraction = setInterval(
                            function () {
                                if ($scope.participantEdges.count == response.data.data.participantInteraction.links.count) {
                                    clearInterval(intervalParticipantInteraction);
                                    d3jsForTopics(
                                        response.data.data.participantInteraction,
                                        "#participantInteractionMap",
                                        false);
                                }
                            }, 1000);

                        // build participant
                        // evolution graph
                        $scope.showParticipantEvolutionGraph = true;
                        $scope.participantEvolution = response.data.data.participantEvolution;
                        var intervalParticipantEvolution = setInterval(
                            function () {
                                if ($scope.participantEvolution.count == response.data.data.participantEvolution.count) {
                                    clearInterval(intervalParticipantEvolution);
                                    d3jsMultipleLinesGraph(
                                        response.data.data.participantEvolution,
                                        "#participantEvolution",
                                        "Contribution ID",
                                        "value");
                                }
                            }, 1000);

                        $scope.showCollaborationGraphs = true;

                        // build
                        // collaboration kb
                        // graph
                        $scope.collaborationSocialKBNodes = response.data.data.socialKB;
                        var intervalCollaborationSocialKB = setInterval(
                            function () {
                                if ($scope.collaborationSocialKBNodes.count == response.data.data.socialKB.count) {
                                    clearInterval(intervalCollaborationSocialKB);
                                    d3jsLineGraph(
                                        response.data.data.socialKB,
                                        "#collaborationSocialKB",
                                        "Contribution ID",
                                        "Social KB value");
                                }
                            }, 1000);

                        // build
                        // collaboration
                        // voice graph
                        $scope.voiceOverlapNodes = response.data.data.voiceOverlap;
                        var intervalCollaborationVoiceOverlap = setInterval(
                            function () {
                                if ($scope.voiceOverlapNodes.count == response.data.data.voiceOverlap.count) {
                                    clearInterval(intervalCollaborationVoiceOverlap);
                                    d3jsLineGraph(
                                        response.data.data.voiceOverlap,
                                        "#collaborationVoiceOverlap",
                                        "Contribution ID",
                                        "Voice PMI");
                                }
                            }, 1000);

                        // build cscl
                        // indices
                        $scope.showParticipantCsclIndices = true;
                        $scope.csclIndices = response.data.data.csclIndices;
                        var intervalCsclIndices = setInterval(
                            function () {
                                if ($scope.csclIndices.count == response.data.data.csclIndices.count) {
                                    clearInterval(intervalCsclIndices);
                                }
                            }, 1000);

                        // build cscl
                        // indices
                        // description
                        $scope.csclIndicesDescription = response.data.data.csclIndicesDescription;
                        var intervalCsclIndicesDescription = setInterval(
                            function () {
                                if ($scope.csclIndicesDescription.count == response.data.data.csclIndicesDescription.count) {
                                    clearInterval(intervalCsclIndicesDescription);
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