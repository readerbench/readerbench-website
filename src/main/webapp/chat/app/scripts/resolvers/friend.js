'use strict';

/**
 * Friend resolver.
 * @description
 * Get user's friends after the authentication resolver is resolved.
 */

angular.module('resolvers').Friend = function friendResolver($q, auth, User) {
    var deferred = $q.defer();

    User.get().then(function (users) {
        deferred.resolve(users);
    });

    return deferred.promise;
};
