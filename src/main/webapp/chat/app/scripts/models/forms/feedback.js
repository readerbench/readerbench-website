'use strict';

/**
 * Feedback model
 * Sends feedback ajax post request
 */
angular.module('models')
.service('Feedback', function ($http, Util) {
    var Feedback = {
        send: function (url, data) {
            return $http({
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data,
                transformRequest: Util.param
            });
        }
    };

    return Feedback;
});
