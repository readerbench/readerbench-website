'use strict';

/**
 * Store timeouts and intervals in Timers service
 * Provide a method to easily clear all timeouts (at logout)
 */

angular.module('services')
.factory('Timers', function ($timeout, $interval) {
    var Timers = {
        intervals: [],
        timeouts: [],
        /**
         * On logout, clear all timers started during the session to avoid unexpected events
         * after the user logs out
         */
        clear: function () {
            _.each(Timers.intervals, function (item) {
                $interval.cancel(item);
            });
            _.each(Timers.timeouts, function (item) {
                $timeout.cancel(item);
            });

            Timers.intervals = [];
            Timers.timeouts = [];
        }
    };

    return Timers;
});
