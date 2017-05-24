/* global DemoTexts */
"use strict";
angular.module('controllers').controller('ContactController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = DemoTexts.contact.title;
    $scope.loading = false;
    $scope.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };
    $scope.sendMessage = function () {
        $scope.showResponse = false;
        $scope.showSuccess = false;
        $scope.showError = false;
        $scope.loading = true;
        var endpoint = 'contact';
        var data = {
            name: $scope.formData.name,
            email: $scope.formData.email,
            subject: $scope.formData.subject,
            message: $scope.formData.message
        };
        $http.post(buildMailServerPath(endpoint, null), data).then(function (response) {
                $scope.loading = false;
                $scope.showResponse = true;
                if (response.data.success !== true) {
                    $scope.message = response.data.errorMsg;
                    $scope.showError = true;
                    return;
                }
                $scope.message = response.data.mailgun.message;
                $scope.showSuccess = true;
            }, function (response) {
                $scope.loading = false;
                if (response.status === 0) {
                    alert('Server error occured!');
                } else {
                    alert(response.statusText);
                }
            });
    };
}]);