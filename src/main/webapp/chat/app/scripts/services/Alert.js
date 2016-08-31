'use strict';

/**
 * @ngdoc service
 * @name services.Alert
 *
 * @description
 * Triggers
 * <span class="label label-success">success</span>
 * <span class="label label-important">error</span>
 * <span class="label label-warning">warn</span>
 * notifications.
 */

angular.module('services')
.factory('Alert', function (config) {
    var Alert = {
        alert: '',
        type: 'error',   // mimics an alert()
        newAlert: null,

        __send: function (type, msg, timeout) {
            Alert.type = type;
            Alert.alert = msg;
            Alert.timeout = timeout || config.timeouts.notification;
            Alert.newAlert = !Alert.newAlert;
        },

        error: function (msg, timeout) {
            Alert.__send('error', msg, timeout);
        },

        success: function (msg, timeout) {
            Alert.__send('success', msg, timeout);
        },

        warn: function (msg, timeout) {
            Alert.__send('warn', msg, timeout);
        }
    };

    return Alert;
});
