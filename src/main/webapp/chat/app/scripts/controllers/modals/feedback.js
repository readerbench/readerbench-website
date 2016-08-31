'use strict';

/**
 * Feedback controller.
 *
 * @description
 * Send feedback form.
 */
angular.module('controllers.modals')
.controller('feedback', function ($scope, $focus, Alert, Feedback) {
    $focus($scope, 'feedback');
    $scope.form = {
        feedback: ''
    };
    $scope.submit = function () {
        Feedback.create($scope.form.submit).then(function () {
            Alert.success('modals.feedback.success');
            $scope.close();
        });
    };
});
