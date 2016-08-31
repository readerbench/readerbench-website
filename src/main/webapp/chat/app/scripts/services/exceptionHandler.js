/* jshint unused:false */
'use strict';

/**
 * Register a global subscriber callback for the TraceKit reporter
 */
angular.module('chat')
.run(function ($window, config) {
    if (config.features.debug) {
        return false;
    }
    if ($window.TraceKit) {
        $window.TraceKit.report.subscribe(function (errorReport) {
        });
    }
});

/**
 * Catch angular exceptions (if not in debug mode) and report them to Tracekit
 */
angular.module('services')
.factory('$exceptionHandler', function ($window, $log, config) {
    return function (exception, cause) {
        // exception has 3 main attributes: message, name & stack
        if ($window.TraceKit && !config.features.debug) {
            $window.TraceKit.report(exception);
        }
        else {
            $log.error.apply($log, arguments);
        }
    };
});
