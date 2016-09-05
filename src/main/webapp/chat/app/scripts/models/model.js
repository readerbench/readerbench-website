'use strict';

/**
 * Generic Model class to be used by
 */
angular.module('models')
.factory('Model', function ($rootScope, $q, Socket) {

    var Model = function () {
        this.deferred = $q.defer();
        this.objects = [];
        this.data = {};
        this.initialize();
        this.$$cache = {};
        this.addListener();

        this.$on('auth:logout', _.bind(this.clear, this));
    };

    Model.extend = function (obj) {
        var parent = this,
            child = function () {
                parent.call(this);
            };

        angular.extend(child, parent);

        child.prototype = Object.create(Model.prototype);
        child.prototype.constructor = child;

        if (angular.isObject(obj)) {
            angular.extend(child.prototype, obj);
        }

        child.prototype.$super = parent;
        return child;
    };

    Model.prototype.initialize = function () {};

    Model.prototype.addListener = function () {
        var self = this;
        if (this.channel) {
            Socket.ready.then(function () {
                var model = self.channel.substr(1);
                Socket.on(model, function (obj) {
                    $rootScope.$apply(function () {
                        switch (obj.verb) {
                        case 'created':
                            self.addToCollection(obj.data);
                            break;
                        case 'destroyed':
                            self.removeFromCollection(obj.previous);
                            break;
                        case 'updated':
                            obj.data.id = +obj.id;
                            self.updateModel(obj.data);
                            break;
                        }
                    });
                });
            });
        }
    };

    Model.prototype.removeListener = function () {
        var self = this;
        if (this.channel) {
            Socket.ready.then(function () {
                var model = self.channel.substr(1);
                Socket.off = model.removeListener;
                // Socket.off(model);
            });
        }
    };

    Model.prototype.getById = function (id) {
        return this.$$cache[id];
    };

    Model.prototype.$$request = function (method, channel, payload, cb) {
        var self = this,
            deferred = $q.defer();

        Socket[method](channel, payload, function (obj, res) {
            var err, errMsg = method.toUpperCase() + ' ' + channel + ' : ';
            $rootScope.$apply(function () {
                if (obj && obj.error) {
                    err = (angular.isObject(obj.error) && obj.error.status) || obj.error;
                    deferred.reject(obj);
                    throw errMsg + err;
                }
                if (res.statusCode !== 200) {
                    throw errMsg + res.statusCode;
                }

                cb.call(self, obj);
                deferred.resolve(obj);
            });
        });

        return deferred.promise;
    };

    Model.prototype.get = function (data) {
        if (angular.isNumber(data)) {
            return this.$$request('get', this.channel + '/' + data, null, this.getCollection);
        } else {
            return this.$$request('get', this.channel, data, this.getCollection);
        }
    };

    Model.prototype.create = function (data) {
        return this.$$request('post', this.channel, data, this.addToCollection);
    };

    Model.prototype.update = function (id, data) {
        return this.$$request('put', this.channel + '/' + id, data, this.updateModel);
    };

    Model.prototype.delete = function (data) {
        if (angular.isNumber(data)) {
            return this.$$request('delete', this.channel + '/' + data, null, this.removeFromCollection);
        } else {
            return this.$$request('delete', this.channel, data, this.removeFromCollection);
        }
    };

    Model.prototype.getCollection = function (data) {
        this.addObjects(data);
    };

    Model.prototype.addToCollection = function (model) {
        this.objects.push(model);
    };

    Model.prototype.removeFromCollection = function (model) {
        this.objects = _.filter(this.objects, function (obj) {
            return obj.id !== model.id;
        });
    };

    Model.prototype.updateModel = function (model) {
        var obj = _.findWhere(this.objects, {id: model.id});
        if (angular.isDefined(obj)) {
            angular.extend(obj, model);
            this.$$cacheObject(obj);
        }
    };

    Model.prototype.addObjects = function (objects) {
        if (!angular.isArray(objects) && angular.isObject(objects)) {
            this.objects = [objects];
        } else {
            this.objects = objects;
        }
        this.$$cacheObjects();
    };

    /**
     * @description
     * The foreign key can be a model or a collection if the current
     * model was populated, or a number, representing the id of the
     * foreign key.
     */
    Model.prototype.getFkId = function (model) {
        if (angular.isNumber(model)) {
            return model;
        }
        return model.id;

    };

    Model.prototype.$$cacheObject = function (object) {
        this.$$cache[object.id] = {};
        angular.extend(this.$$cache[object.id], object);
        delete this.$$cache[object.id].id;
    };

    Model.prototype.$$cacheObjects = function () {
        angular.forEach(this.objects, function (object) {
            this.$$cacheObject(object);
        }, this);
    };

    Model.prototype.clear = function () {
        this.objects = {};
        this.data = {};
        this.deferred = $q.defer();
        this.removeListener();

        return this;
    };

    // shortcuts for some rootScope watchers and handlers
    var watchers = {
        $on: _.bind($rootScope.$on, $rootScope),
        $emit: _.bind($rootScope.$emit, $rootScope),
        $watch: _.bind($rootScope.$watch, $rootScope),
        $watchCollection: _.bind($rootScope.$watchCollection, $rootScope)
    };

    angular.extend(Model.prototype, watchers);

    return Model;
});
