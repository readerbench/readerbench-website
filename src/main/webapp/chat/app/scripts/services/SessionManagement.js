'use strict';

angular.module('services')
.factory('SessionManagement',
    function ($modal, $rootScope, $interval, $location,
        config, Cookie, Net, Alert, Timers, Templates) {
    var SessionManagement = {
        start: function () {
            this.userInactive = false;
            var self = this;
            $rootScope.$on('session:extended:reset', _.bind(this.restartInactivityTimer, this));
            $rootScope.$on('auth:login', function ($scope, data) {
                self.setSessionTimer($scope, data);
                self.__startSessionInterval();
                self.__startInactivityInterval();
            });
        },

        setSessionTimer: function ($scope, data) {
            if (data) {
                var ttlSession = data.ttl * config.session.ttlToMiliseconds;
                if (ttlSession > 60000) {
                    this.sessionTimeout = ttlSession - 60000;
                }
                else {
                    this.sessionTimeout = 5000; //se default session expire at 10 seconds
                }
            }
        },

        /*
         *   Starts session timer. Call refresh session from time to time
         */
        __startSessionInterval: function () {
            this.sessionInterval = $interval(
                _.bind(this.__refreshSession, this),
                this.sessionTimeout
            );
            Timers.intervals.push(this.sessionInterval);
        },

        /**
            Start the timer for user inactivity
        */
        __startInactivityInterval: function () {
            var self = this;
            this.inactivityInterval = $interval(function () {
                self.userInactive = true;
            }, config.session.userInactivityTimer); //add constant here
            Timers.intervals.push(this.inactivityInterval);
        },

        /**
            Checks if remember me token is present or if the user is active.
            Based on that, it silently refreshes
            the session or it is displaying the Session Expired Lightbox
        */
        __refreshSession: function () {
            // if ($location.path() === '/auth/login' || $location.path() === 'auth/forgot') {
            //     return;
            // }
            if (!Cookie.get(config.cookie.token) || this.userInactive) {
                //this triggered the session expired view. This should be replaced
                //replace with an alert or with a modal
                $rootScope.sessionExpired = true;
                $interval.cancel(this.sessionInterval);
                this.__openSessionExpiredModal();
            }
            else {
                Net.send('AUTH.REFRESH_SESSION'); //see how this should be changed
            }
        },

        __openSessionExpiredModal: function () {
            $modal.open({
                templateUrl: Templates.modal.sessionExpired,
                controller: 'SessionExpire',
                backdrop: true
            });
        },

        /**
         * Clear the former inactivity interval and starts a new one. Call this when
         * a new socket event is triggered, but except refresh session
         */
        restartInactivityTimer: function () {
            $interval.cancel(this.inactivityInterval);
            this.__startInactivityInterval();
        },

        /*
         * Resets session timer and sets the user as active
         */
        restartSessionTimer: function () {
            this.__startSessionInterval();
            this.userInactive = false;
        }
    };

    return SessionManagement;
});
