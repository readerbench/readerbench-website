'use strict';

/**
 * Export to pdf / json service
 */

angular.module('services')
.service('Language', function ($q, config, Socket) {

    this.detect = function (text) {
        return $http({
            method: 'POST',
            url: config.api.language.detect,
            data: {text: text}
        });
    };

    this.translate = function (text, to) {
        var deferred = $q.defer();
        Socket.post(config.api.language.translate, { text: text, to: to }, function (data) {
            if (data && data.text) {
                deferred.resolve(data.text);
            } else {
                deferred.reject(data);
            }
        });

        return deferred.promise;
    };
});
