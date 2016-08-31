'use strict';

/**
 * Dashboard controller
 */
angular.module('controllers')
.controller('Dashboard', function ($scope, Alert, Bookmark, Message, Room, User) {
    $scope.Message = Message;
    $scope.Bookmark = Bookmark;
    $scope.User = User;
    $scope.Room = Room;
    $scope.Alert = Alert;
});
