/**
* Bookmark.js
*
* @description
* Bookmark model
*/

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        message: {
            model: 'message',
            required: true
        },

        user: {
            model: 'user',
            required: true
        }
    },

    afterValidate: function (values, cb) {
        Bookmark.findOne({
            message: values.message,
            user: values.user
        }).exec(function (err, bookmark) {
            if (err) {
                return cb(err);
            }
            if (bookmark) {
                cb(new Error('Bookmark already exists.'));
            }
            cb();
        });
    },

    afterCreate: function (bookmark, cb) {
        Message.findOne({id: bookmark.message}, function (err, message) {
            if (err) {
                cb(err);
            }
            bookmark.message = message.toJSON();
            cb();
        });
    }
};
