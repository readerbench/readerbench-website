"use strict";

angular.module('controllers').controller('DemoVcopController', ['$scope', '$http', '$sce', 'Upload', '$timeout', function ($scope, $http, $sce, Upload, $timeout) {

    // texts
    $scope.title = DemoTexts.vcop.title;

    // options for selectable fields
    $scope.vcopCommunityOptions = DemoElements.vcopCommunityOptions;
    $scope.textualComplexityOptions = DemoElements.textualComplexityOptions;

    $scope.formData = {
        community: DemoElements.defaultVcopCommunityOptions,
        useTextualComplexity: DemoElements.defaulttextualComplexityOptions,
        monthIncrement: DemoElements.defaultMonthIncrement,
        dayIncrement: DemoElements.defaultDayIncrement
    };

    $scope.loading = false;

    $scope.communityNodes = null;
    $scope.communityEdges = null;

    $scope.communityInTimeFrameNodes = null;
    $scope.communityInTimeFrameEdges = null;

    $scope.communityInTimeList = null;
    $scope.communityInTimeNodes = null;
    $scope.communityInTimeEdges = null;

    $scope.buttonClick = function (req) {

        $scope.showCommunityGraph = false;
        $scope.showCommunityInATimeFrameGraph = false;
        $scope.showCommunityInTimeGraph = false;

        var endpoint;
        switch (req) {
            case 'Community':

                $scope.loading = true;

                endpoint = 'vcop';

                var data = {
                    community: $scope.formData.community.value,
                    startDate: $scope.formData.startDate,
                    endDate: $scope.formData.endDate,
                    monthIncrement: $scope.formData.monthIncrement,
                    dayIncrement: $scope.formData.dayIncrement,
                    useTextualComplexity: $scope.formData.useTextualComplexity.value
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

                        // build all the
                        // community
                        $scope.showCommunityGraph = true;
                        $scope.communityNodes = response.data.data.participantInteractionAllDocuments.nodes;
                        $scope.communityEdges = response.data.data.participantInteractionAllDocuments.links;

                        var intervalParticipantInteraction = setInterval(
                            function () {
                                if ($scope.communityEdges.count == response.data.data.participantInteractionAllDocuments.links.count) {
                                    clearInterval(intervalParticipantInteraction);
                                    d3jsForTopicsForvCop(
                                        response.data.data.participantInteractionAllDocuments,
                                        "#communityGraph",
                                        false);
                                }
                            }, 1000);

                        // build community
                        // from start to end
                        $scope.showCommunityInATimeFrameGraph = true;
                        $scope.communityInTimeFrameNodes = response.data.data.participantInteractionStartEndDate.nodes;
                        $scope.communityInTimeFrameEdges = response.data.data.participantInteractionStartEndDate.links;
                        var intervalCommunityInTimeFrame = setInterval(
                            function () {
                                if ($scope.communityInTimeFrameEdges.count == response.data.data.participantInteractionStartEndDate.links.count) {
                                    clearInterval(intervalCommunityInTimeFrame);
                                    d3jsForTopicsForvCop(
                                        response.data.data.participantInteractionStartEndDate,
                                        "#communityInATimeFrameGraph",
                                        false);
                                }
                            }, 1000);

                        // build community
                        // from start to end
                        $scope.showCommunityInTimeGraph = true;
                        $scope.communityInTimeList = response.data.data.participantInteractionInTimeList;

                        var i = 0;
                        $scope.communityParticipantInteractionInTimeEdges = null;
                        var intervalparticipantInteractionInTime = setInterval(
                            function () {
                                response.data.data.participantInteractionInTimeList
                                    .forEach(function (
                                        participantInteractionInTime,
                                        index) {
                                        console
                                            .log(participantInteractionInTime);
                                        $scope.communityParticipantInteractionInTimeEdges = participantInteractionInTime.links;
                                        if ($scope.communityParticipantInteractionInTimeEdges.count == response.data.data.participantInteractionInTimeList[index].links.count) {
                                            clearInterval(intervalparticipantInteractionInTime);
                                            d3jsForTopicsForvCoPSubcommunities(
                                                participantInteractionInTime,
                                                "#communityInTimeGraph"
                                                + index,
                                                false);

                                        }
                                    })
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