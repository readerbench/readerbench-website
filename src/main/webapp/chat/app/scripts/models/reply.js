'use strict';

/**
 * Reply model
 */
angular.module('models')
.factory('Reply', function (Model, Message) {

    var Reply = Model.extend({
        channel: '/reply',

        addToCollection: function (reply) {
            this.$super.prototype.addToCollection.call(this, reply);
            var msg = Message.getById(reply.message);
            msg.reply = reply;
            msg.id = reply.message;
            Message.updateModel(msg);
        }
    });

    return new Reply();
});
