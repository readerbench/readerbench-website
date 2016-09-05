'use strict';

/**
 * My profile modal controller
 */
angular.module('controllers.modals')
.controller('myProfile', function ($scope, $http, $state, $focus, config, Alert, User) {
    $focus($scope, 'name');

    $scope.profile = {
        name: '',
        language: config.languages[config.language],
        fileUpload: null,
        email: '',
        emailRegexp: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    };

    $scope.languages = config.languages;
    $scope.user = angular.extend({}, User.user);
    $scope.User = User;

    $scope.saveProfile = function saveProfile() {
        User
        .update(User.user.id, {name: $scope.user.name})
        .then(function () {
            $scope.close();
        }, function () {

        });
    };

    $scope.removePicture = function removePicture() {
        User
        .update(User.user.id, {picture: null})
        .then(function () {
            Alert.success('modals.profile.alerts.picture.remove');
        });
    }

    /**
     * @description
     * Listen for changes of form.fileUpload and perform an upload
     * for valid (not-falsy) values of fileUpload
     */
    $scope.$watch('profile.fileUpload', function (newValue, oldValue) {
        if (!$scope.profile.fileUpload) {
            return;
        }
        $scope.upload();
    }, true);

    $scope.upload = function () {
        var fd = new FormData();

        // create a form data object with the uploaded file and the backend token
        fd.append('picture', $scope.profile.fileUpload);

        // upload a file via an ajax post call to the mya endpoint
        $http({
            url: config.api.uploadPicture.replace(':userId', User.user.id),
            method: 'POST',
            headers: {'Content-Type': undefined},
            data: fd,
            transformRequest: angular.identity
        })
        .success(function (data) {
            console.error(data);
        })
        .error(function (data) {
            Alert.error('form.profile.err.general');
            console.error(data);
        });
    };
});
