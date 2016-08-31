'use strict';

/**
 * Auth resolver will wait for a login request to be resolved, will set the cookie sid and
 * sid_token, and will solve the promise it returns
 */
angular.module('resolvers').Auth = function authResolver($state, $q, Auth, User) {
    var deferred = $q.defer();

    User.deferred.promise.then(function (user) {
        deferred.resolve(user);
    });

    Auth.$loading.promise.then(
        function () {
            deferred.resolve();
        }, function () {
            $state.go('auth.login');
        });

    return deferred.promise;
};
