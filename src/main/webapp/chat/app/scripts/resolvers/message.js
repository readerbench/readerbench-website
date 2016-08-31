'use strict';

/**
 * Message resolver
 */

angular.module('resolvers').Message =
        function messageResolver($stateParams, $q, auth, Message) {
    var deferred = $q.defer(),
        roomId = $stateParams.roomId || $stateParams.friendId;

    Message.get({room: roomId, populate: 'reply'}).then(function (messages) {
        deferred.resolve(messages);
    });

    return deferred.promise;
};
