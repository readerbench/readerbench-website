'use strict';

/**
 * Room model
 * Stores rooms's data
 */
angular.module('models')
.factory('Room', function (config, Model) {

    var Room = Model.extend({
        channel: '/room'
    });

    return new Room();
});
