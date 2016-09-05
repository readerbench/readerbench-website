/**
* Reply.js
*
* @description
* Describes the structure of a reply.
*/

module.exports = {
    attributes: {

        // the message which is attached to the reply
        message: {
            model: 'Message',
            required: true
        },

        // the messages which are referenced by the reply
        messages: {
            type: 'array',
            required: true
        }
    }
};

