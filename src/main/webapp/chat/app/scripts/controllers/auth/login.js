'use strict';

/**
 * Login Controller, inherits from Auth controller
 */
angular.module('controllers.auth')
.controller('Login', function ($scope, Auth) {
    $scope.user = {
        email: '',
        password: '',
        rememberMe: true,
        emailRegexp: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    };

    $scope.login = function () {
        if (!$scope.auth.form.$valid) {
            $scope.error();
            return false;
        }

        return Auth.login(_.pick($scope.user, 'email', 'password', 'rememberMe'));
    };
});
