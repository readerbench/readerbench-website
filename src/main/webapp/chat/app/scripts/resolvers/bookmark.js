'use strict';

/**
 * Bookmark resolver
 * @description
 * Get user's first `limit` bookmarks after the authentication resolver is resolved.
 */

angular.module('resolvers').Bookmark = function (payload) {
    function bookmarkResolver($q, $stateParams, auth, Bookmark) {
        var deferred = $q.defer();

        Bookmark.get(payload).then(function (bookmarks) {
            deferred.resolve(bookmarks);
        }, function (resp) {
            deferred.reject(resp);
        });

        return deferred.promise;
    }

    bookmarkResolver.$inject = ['$q', '$stateParams', 'auth', 'Bookmark'];
    return bookmarkResolver;
};
