'use strict';

angular.module('services')
.factory('OSBrowserDetection', function ($window) {
    var OSBrowserDetection = {
        /**
        Check the OS version and return it in a recognizable format
        */
        getOSVersion: function () {
            var userAgent = $window.navigator.userAgent;
            userAgent = userAgent.replace(/_/g, '.');

            var OSVersion = userAgent;
            if ($window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) {
                OSVersion = 'Windows 8';
            }
            if ($window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) {
                OSVersion = 'Windows 7';
            }
            if ($window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) {
                OSVersion = 'Windows Vista';
            }
            if ($window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) {
                OSVersion = 'Windows XP';
            }
            if ($window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) {
                OSVersion = 'Windows 2000';
            }
            if ($window.navigator.userAgent.indexOf('Mac') !== -1) {
                OSVersion = 'Mac/iOS';
            }
            if ($window.navigator.userAgent.indexOf('X11') !== -1) {
                OSVersion = 'UNIX';
            }
            if ($window.navigator.userAgent.indexOf('Linux') !== -1) {
                OSVersion = 'Linux';
            }
            return OSVersion;
        }
    };
    return OSBrowserDetection;
});
