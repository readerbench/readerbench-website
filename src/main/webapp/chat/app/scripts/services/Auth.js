'use strict';

/**
 * @ngdoc service
 * @name services.Auth
 *
 * @description
 * Auth service for making login, signup, logout, forgout & reset backend calls and
 * checking if a user is logged in or not (using data from cookies).
 *
 * <div class="alert alert-success">
 * **Best Practice:** It's recommended to use the Auth service for all auth events (i.e:
 * login, reset, forgot, sign up, log out) and for performing the initial token check.
 * </div>
 */

angular.module('services')
.service('Auth', function ($rootScope, $http, $q, $state, $timeout,
        config, Socket, Cookie, Timers, User) {

    var Auth = {

        /**
         * @ngdoc property
         * @name services.Auth#check
         * @propertyOf services.Auth
         *
         * @description
         * A deferred which is solved if the user is logged in or reject
         * if the user is logged out.
         */
        $loading: $q.defer(),

        $$loginResponse: function (resp) {
            $rootScope.$apply(_.bind(function () {
                if (resp.status === 'ok' && angular.isObject(resp.data)) {
                    this.setLoginCookies(resp.data);
                    User.init(resp.data);
                    this.$loading.resolve();
                    $rootScope.$emit('auth:success');
                } else {
                    $rootScope.$broadcast('auth:error', resp.message);
                    Cookie.remove(config.cookie.token, { path: '/', domain: config.cookie.domain });
                    this.$loading.reject();
                }
            }, this));
        },

        check: function () {
            var sidToken = Cookie.get(config.cookie.token);

            if (sidToken) {
                this.tokenLogin(sidToken);
            } else {
                this.$loading.reject();
            }
        },

        tokenLogin: function (token) {
            Socket.post('/auth/login/token', {token: token}, _.bind(this.$$loginResponse, this));
        },

        /**
         * @ngdoc function
         * @name services.Auth#login
         * @methodOf services.Auth
         * @function
         *
         * @description
         * Stores in Auth.request that a login attempt has been made and
         * makes a Net login request
         *
         * @param {Object} params Parameters for the login request.
         * @returns {Boolean} The boolean value of the login request.
         */
        login: function (params) {
            this.$loading = $q.defer();
            Socket.post('/auth/login', params, _.bind(this.$$loginResponse, this));
        },

        /**
         * @ngdoc function
         * @name services.Auth#signup
         * @methodOf services.Auth
         * @function
         *
         * @description
         * Stores in Auth.request that a login attempt has been made and
         * makes a Net signup request
         *
         * @param {Object} params Parameters for the sign up request.
         * @returns {Boolean} The boolean value of the Net request.
         */
        signup: function (params) {
            this.$loading = $q.defer();
            Socket.post('/auth/signup', params, _.bind(this.$$loginResponse, this));
        },

        /**
         * @ngdoc function
         * @name services.Auth#forgot
         * @methodOf services.Auth
         * @function
         *
         * @description
         * Makes a password forgot request.
         *
         * @param {Object} params Parameters for the forgot password request.
         */
        forgot: function () {},

        /**
         * @ngdoc function
         * @name services.Auth#reset
         * @methodOf services.Auth
         * @function
         *
         * @description
         * Makes a password reset request.
         *
         * @param {Object} params Parameters for the reset password request.
         */
        reset: function () {},

        /**
         * @ngdoc function
         * @name services.Auth#logOut
         * @methodOf services.Auth
         * @function
         *
         * @description
         * Makes a logout request sends a `auth:logout` via pubsub.
         * Redirects to login page.
         */
        logOut: function () {
            Socket.post('/auth/logout');
            this.$loading = $q.defer();
            this.removeLoginCookies();
            Timers.clear();
            $rootScope.$emit('auth:logout');
            $state.go('auth.login');
        },

        /**
         * @ngdoc function
         * @name services.Auth#gotoLogin
         * @methodOf services.Auth
         * @function
         *
         * @description
         * Clears the loading state and redirects to login page.
         */
        gotoLogin: function () {
            $state.go('auth.login');
        },

        getSessionId: function () {
            return $http.get(config.socket + 'session');
        },

        setSessionId: function () {
            var deferred = $q.defer();
            this.getSessionId().success(function (sessionId) {
                Cookie.set(config.cookie.sid, sessionId,
                    {path: '/', domain: config.cookie.domain});

                deferred.resolve(sessionId);
            });
            return deferred.promise;
        },

        setLoginCookies: function (user) {
            if (user.token) {
                Cookie.set(config.cookie.token, user.token,
                    { path: '/', domain: config.cookie.domain });
            }
        },

        removeLoginCookies: function () {
            var domain = config.cookie.domain;
            Cookie.remove(config.cookie.sid, { path: '/', domain: domain });
            Cookie.remove(config.cookie.token, { path: '/', domain: domain });
        },
    };

    return Auth;
});
