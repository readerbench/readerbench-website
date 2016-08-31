'use strict';

angular.module('services')
.provider('Socket', function () {
    var socket, self = this,
        methods = ['on', 'get', 'post', 'put', 'delete', 'request', '_request'];

    var initialize = function () {
        if (!self.socket) {
            self.socket = {};
        }

        angular.forEach(methods, function (method) {
            self.socket[method] = function () {
                var args = [].slice.call(arguments);
                self.socket.ready.then(function () {
                    socket[method].apply(socket, args);
                });
            };
        });
    };

    this.$get = function ($q) {
        var deferred = $q.defer();
        this.socket.ready = deferred.promise;
        socket.on('connect', function () {
            deferred.resolve();
        });

        return this.socket;
    };

    this.connect = function (url) {
        socket = io.connect(url);
        window.socket = socket;
        initialize();
    };
});
