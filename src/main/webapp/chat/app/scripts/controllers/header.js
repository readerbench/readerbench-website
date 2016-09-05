'use strict';

/**
 * Header controller
 */
angular.module('controllers')
.controller('Header', function ($scope, $state, $stateParams, User, Room) {
    if ($stateParams.roomId) {
        $scope.room = Room.getById(+$stateParams.roomId);
    }
    if ($stateParams.friendId) {
        $scope.room = User.getById(+$stateParams.friendId);
    }
    $scope.showMenu = {};
    $scope.toggleMenu = function (menuName) {
        $scope.showMenu[menuName] = !$scope.showMenu[menuName];
    };

});
