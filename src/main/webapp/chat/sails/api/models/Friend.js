/**
* Friend.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        user1: {
            model: 'User'
        },

        user2: {
            model: 'User'
        },

        from: {
            model: 'User',
            required: true
        },

        to: {
            type: 'email',
            required: true
        },

        // sent, accepted, rejected
        status: {
            type: 'string',
            required: true
        },

        room: {
            model: 'Room'
        }

    },

    afterValidate: function (values, cb) {
        if (+values.user1 > +values.user2) {
            // reverse values
            values.user1 = [values.user2, values.user2 = values.user1][0];
        }
        cb();
    }
};

