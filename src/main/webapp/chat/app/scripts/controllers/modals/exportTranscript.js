'use strict';

/**
 * Export chat transcript controller.
 *
 * @description
 * Exports a transcript for a chatroom in xml or json format.
 */
angular.module('controllers.modals')
.controller('exportTranscript', function ($scope, $stateParams, config) {
    var roomId = +($stateParams.roomId || $stateParams.friendId);
    $scope.form = {
        format: 'xml'
    };
    $scope.downloadTranscriptLink = config.api.export.replace(':roomId', roomId);
});
