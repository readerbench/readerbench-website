'use strict';

/**
 * Room model
 * Stores messages from a room
 */
angular.module('models')
.factory('Message', function (Model) {

    var Message = Model.extend({
        channel: '/message',

        getCollection: function (messages) {
            this.$super.prototype.getCollection.call(this, messages);
            this.data = {};

            angular.forEach(messages, function (msg) {
                this.addMessage(msg.room, msg);
            }, this);
        },

        addToCollection: function (msg) {
            this.$super.prototype.getCollection.call(this, msg);
            this.addMessage(msg.room, msg);
        },

        /**
         * @description
         * Make sure updates in messages where reply is a number do not break
         * the functionality.
         */
        updateModel: function (model) {
            var message = this.getById(model.id);
            if (angular.isDefined(message) && angular.isObject(message.reply) &&
                    angular.isNumber(model.reply)) {
                model.reply = message.reply;
            }
            this.$super.prototype.updateModel.call(this, model);
        },

        /**
         * @description
         * Organize room messages based on users and date.
         */
        addMessage: function (roomId, msg) {
            if (!this.data[roomId]) {
                this.data[roomId] = [[]];
            }
            var idx = this.data[roomId].length - 1 || 0,
                lastMsgIdx = this.data[roomId][idx].length - 1 || 0,
                lastMsg = this.data[roomId][idx][lastMsgIdx];

            if (lastMsg &&
                    this.getFkId(lastMsg.user) !== this.getFkId(msg.user)) {
                idx++;
            }
            if (!this.data[roomId][idx]) {
                this.data[roomId][idx] = [msg];
            } else {
                this.data[roomId][idx].push(msg);
            }
        }
    });

    return new Message();
});
