/**
* Message.js
*
* @description
* Describes the structure of a message.
*/

module.exports = {

    attributes: {

        message: {
            type: 'string',
            required: true
        },

        language: {
            type: 'string'
        },

        user: {
            model: 'User',
            via: 'messages',
            required: true
        },

        room: {
            model: 'Room',
            //via: 'messages',
            required: false
        },

        bookmarks: {
            collection: 'Bookmark',
            via: 'message'
        },

        reply: {
            model: 'Reply',
            via: 'message'
        }
    }
};
