'use strict';

/**
 * Room resolver
 */
angular.module('resolvers').Room = function ($stateParams, $q, auth, Room) {
    var deferred = $q.defer(),
        roomId = $stateParams.roomId || $stateParams.friendId;

    // Retrieve room information
    Room.get(roomId).then(function (room) {
        deferred.resolve(room);
    });

    return deferred.promise;
};
