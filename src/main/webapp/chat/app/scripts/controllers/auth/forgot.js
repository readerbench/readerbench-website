'use strict';

/**
 * Forgot Controller, inherits from Auth controller
 */
angular.module('controllers.auth')
.controller('Forgot', function ($scope, Auth) {
    $scope.user = {
        email: '',
        emailRegexp: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    };

    $scope.submit = function () {
        if (!$scope.auth.form.$valid) {
            $scope.error();
            return false;
        }

        return Auth.forgot(_.pick($scope.user, 'email'));
    };
});
