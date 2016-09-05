/**
* Room.js
*
* @description
* Chat room model.
*/

module.exports = {

    attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: 'string',
            required: true,
            minLength: 3
        },

        user: {
            model: 'User',
            via: 'rooms',
            required: true
        },

        lastMessageAt: {
            type: 'date',
            required: false
        },

        isPrivate: {
            type: 'boolean',
            required: true,
            defaultsTo: false,
        },

        users: {
            collection: 'User',
            via: 'rooms'
        },

        messages: {
            collection: 'Message',
            via: 'room'
        }
    }
};
