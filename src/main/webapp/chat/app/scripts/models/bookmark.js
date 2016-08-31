'use strict';

/**
 * Bookmark model
 */
angular.module('models')
.factory('Bookmark', function (config, Model, Message) {

    var Bookmark = Model.extend({
        channel: '/bookmark',

        getCollection: function (bookmarks) {
            this.$super.prototype.getCollection.call(this, bookmarks);

            angular.forEach(bookmarks, function (bookmark) {
                if (angular.isUndefined(this.data[bookmark.message.id])) {
                    this.data[bookmark.message.id] = bookmark;
                }
            }, this);
        },

        addToCollection: function (model) {
            var messageId = model.message;
            if (angular.isNumber(messageId)) {
                model.message = Message.getById(messageId);
            } else if (angular.isObject(messageId)) {
                messageId = model.message.id;
            }
            this.$super.prototype.addToCollection.call(this, model);
            this.data[messageId] = model;
        },

        removeFromCollection: function (model) {
            this.$super.prototype.removeFromCollection.call(this, model);
            delete this.data[model.message.id];
        },

        toggle: function (userId, messageId, roomId) {
            if (this.data[messageId] && this.data[messageId].id) {
                this.delete(this.data[messageId].id, null);
            } else {
                this.create({user: userId, message: messageId, room: roomId});
            }
        }
    });

    return new Bookmark();
});
