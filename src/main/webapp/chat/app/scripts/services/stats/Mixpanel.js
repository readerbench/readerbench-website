'use strict';

angular.module('services')
.service('Mixpanel', function ($rootScope, $window, OSBrowserDetection, config) {
    var events = [];
    // treat multiple errors which come from the backend
    $rootScope.$on('socket:AUTH.LOGIN.EMAIL.EMPTY_EMAIL', function () {
        Mixpanel.send('WebGUI Login Error', {'Error Message': 'Empty Email'});
    });

    $rootScope.$on('socket:AUTH.LOGIN.EMAIL.EMPTY_PASSWORD', function () {
        Mixpanel.send('WebGUI Login Error', {'Error Message': 'Empty Password'});
    });

    $rootScope.$on('socket:AUTH.LOGIN.EMAIL.INVALID_CREDENTIALS', function () {
        Mixpanel.send('WebGUI Login Error', {'Error Message': 'Invalid Credentials'});
    });

    $rootScope.$on('socket:AUTH.LOGIN.SID_TOK.INVALID_SID', function () {
        Mixpanel.send('WebGUI Login Error', {'Error Message': 'Invalid SID'});
    });
    var Mixpanel = {
        send: function (eventName, extraInfo) {
            var params = {
                'AppType': 'Mobile WebGUI',
                'Language': config.language,
                'OS': $window.navigator.platform,
                'OS_Detailed': OSBrowserDetection.getOSVersion(),
                'Browser version': $window.browserName + $window.browserVersion,
                'Device Size': $window.screen.width + 'x' + $window.screen.height,
                'Browser Size': $window.innerWidth + 'x' + $window.innerHeight
            };

            if (angular.isObject(extraInfo)) {
                angular.extend(params, extraInfo);
            }

            events.push(eventName);

            return $window.mixpanel.track(eventName, params);
        },
        // when the events are retrieved, return the events list
        // and empty the events array
        getEvents: function () {
            var aux = events.slice();
            events = [];
            return aux;
        }
    };

    return Mixpanel;
});
