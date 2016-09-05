'use strict';
/**
 * Http Interceptor for ajax requests retrieving the language json
 */
angular.module('services')
.factory('HashHttpInterceptor', function ($q, HashConfig, config) {

    var cdn = config.cdn;

    return {
        request: function (config) {
            if (_.has(HashConfig, config.url)) {
                config.url = cdn + HashConfig[config.url];
            }

            return config;
        }
    };
});
