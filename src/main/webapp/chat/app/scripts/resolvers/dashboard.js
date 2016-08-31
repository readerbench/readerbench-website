'use strict';

/**
 * Dashboard resolver.
 * @description
 * Get user's rooms after the authentication resolver is resolved.
 */
angular.module('resolvers').Dashboard = function ($q, auth, Room) {
    var deferred = $q.defer();

    Room.get({populate: 'users'}).then(function () {
        deferred.resolve(Room.objects);
    });

    return deferred.promise;
};
