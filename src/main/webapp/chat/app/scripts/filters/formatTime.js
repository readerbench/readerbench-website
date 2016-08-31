/* jshint bitwise : false */
'use strict';

angular.module('filters')
.filter('formatTime', function ($translate) {
    return function (diffTime, actionDone, actionFailed) {
        var seconds, interval, timeAgo;
        actionFailed = !actionFailed ?
            $translate('general.time.unknown') : $translate(actionFailed);
        actionDone = !actionDone ? '' : $translate(actionDone);

        if (!diffTime) {
            return actionFailed;
        }

        if (diffTime < 0) {
            diffTime = 0;
        }

        seconds  = Math.floor(diffTime / 1000);
        interval = Math.floor(seconds / 31536000);

        timeAgo = (function getTimeAgo() {
            if (interval >= 2) { return ['general.time.years_ago', ~~interval]; }
            else if (interval >= 1) { return ['general.time.year_ago', ~~interval]; }

            interval = seconds / 2592000;
            if (interval >= 2) { return ['general.time.months_ago', ~~interval]; }
            else if (interval >= 1) { return ['general.time.month_ago', ~~interval]; }

            interval = seconds / 604800;
            if (interval >= 2) { return ['general.time.weeks_ago', ~~interval]; }
            else if (interval >= 1) { return ['general.time.week_ago', ~~interval]; }

            interval = seconds / 86400;
            if (interval >= 2) { return ['general.time.days_ago', ~~interval]; }
            else if (interval >= 1) { return ['general.time.day_ago', ~~interval]; }

            interval = seconds / 3600;
            if (interval >= 2) { return ['general.time.hours_ago', ~~interval]; }
            else if (interval >= 1) { return ['general.time.hour_ago', ~~interval]; }

            interval = seconds / 60;
            if (interval >= 2) { return ['general.time.minutes_ago', ~~interval]; }
            else if (interval >= 1) { return ['general.time.minute_ago', ~~interval]; }

            return ['general.time.just_now', seconds];
        })();

        return (actionDone) + ' ' + $translate(timeAgo[0], { interval: timeAgo[1]});
    };
});
