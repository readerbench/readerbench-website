"use strict";

angular.module('controllers').controller('ContactController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    // texts
    $scope.title = DemoTexts.contact.title;

    $scope.loading = false;

    $scope.formData = {
        name: '',
        email: '',
        title: '',
        message: ''
    };

    $scope.sendMessage = function () {

        $scope.showResponse = false;

        var endpoint;

        $scope.loading = true;

        endpoint = 'sendContactEmail';
        var data = {
            name: $scope.formData.name,
            email: $scope.formData.email,
            subject: $scope.formData.subject,
            message: $scope.formData.message
        };

        var params = {};

        $http.post(
            buildServerPath(endpoint, params),
            data).then(function (response) {

                $scope.loading = false;
                $scope.showResponse = true;

                if (response.data.success != true) {
                    alert('Server error occured!');
                    return;
                }

                $scope.message = response.data.mailgun.message;
                $scope.showSuccess = true;


            }, function (response) {

                $scope.loading = false;

                if (response.status == 0) {
                    alert('Server error occured!');
                } else {
                    alert(response.statusText);
                }

            });
    }

}])