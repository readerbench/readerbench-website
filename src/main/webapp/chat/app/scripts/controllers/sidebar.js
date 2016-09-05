'use strict';

/**
 * Sidebar controller
 */
angular.module('controllers')
.controller('Sidebar', function ($scope, $state, $stateParams, Alert, User, Room) {
    $scope.User = User;
    $scope.Room = Room;
    $scope.id = +($stateParams.roomId || $stateParams.friendId);
    $scope.show = false;
    if ($state.current.data) {
        $scope.channel = $state.current.data.channel;
    }

    $scope.changeStatus = function (status) {
        User.update(User.user.id, {status: status});
    };

    $scope.toggleVisibility = function () {
        $scope.show = !$scope.show;
    };

    $scope.deleteRoom = function (roomId) {
        Room.delete(roomId).then(function () {
            Alert.warn('sidebar.rooms.delete');
            if ($scope.id === roomId) {
                $state.go('main.dashboard');
            }
        });
    };
});
