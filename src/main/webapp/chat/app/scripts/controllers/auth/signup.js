'use strict';

/**
 * Signup controller, inherits from Auth controller
 */
angular.module('controllers.auth')
.controller('Signup', function ($scope, $focus, Auth) {
    $scope.user = {
        name: '',
        email: '',
        password: '',
        emailRegexp: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    };

    $focus($scope, 'name');

    $scope.submit = function () {
        if (!$scope.auth.form.$valid) {
            $scope.error();
            return false;
        }

        return Auth.signup(_.pick($scope.user, 'name', 'email', 'password'));
    }
});
