'use strict';

/**
 * Feedback model
 */
angular.module('models')
.factory('Feedback', function (config, Model) {

    var Feedback = Model.extend({
        channel: '/feedback'
    });

    return new Feedback();
});
