'use strict';

/**
 *
 */
angular.module('controllers.modals')
.controller('inviteFriend', function ($scope, $state, $focus, User) {
    $focus($scope, 'email');

    $scope.friend = {
        email: '',
        emailRegexp: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    };

    $scope.submit = function () {
        // Room.create({
        //     name: $scope.room.name,
        //     userId: User.user.id,
        //     members: [User.user.id]
        // });
        $scope.close();
    };
});
