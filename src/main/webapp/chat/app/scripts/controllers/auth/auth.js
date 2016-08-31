'use strict';

angular.module('controllers.auth')
.controller('Auth', function ($scope, $state, $timeout, $focus, User) {
    $scope.auth = {
        errorMsg: '',
        form: {}
    };
    $focus($scope, 'email');

    $scope.error = function () {
        $scope.errorSubmission = true;
        $timeout(function () {
            $scope.errorSubmission = false;
        }, 500);

        var form = $scope.auth.form;
        if (form.name && !form.name.$valid) {
            $focus($scope, 'name');
        } else if (form.email && !form.email.$valid) {
            $focus($scope, 'email');
        } else if (form.password && !form.password.$valid) {
            $focus($scope, 'password');
        }
    };

    // Redirect to dashboard when user promised is solved
    User.deferred.promise.then(function () {
        $state.go('main.dashboard');
    });

    $scope.$on('auth:error', function (scope, msg) {
        $scope.auth.errorMsg = msg;
        $scope.error();
    });

    $scope.$on('$stateChangeSuccess', function () {
        $scope.auth.errorMsg = '';
    });
});
