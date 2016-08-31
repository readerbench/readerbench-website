/**
 * UploadController
 *
 * @description :: Server-side logic for managing Uploads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var path = require('path'),
    fileAdapter = require('skipper-disk')();

var generateUUID = function () {
    return 'xxxxxxxxyxxx5xx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

var receiver = function (userId) {

    return fileAdapter.receive({
        dirname: sails.config.appPath + '/../app/images/profile',
        saveAs: function (file) {
            var filename = file.filename,
                newName = generateUUID() + path.extname(filename);
            return newName;
        }
    });
}

module.exports = {
	uploadPicture: function (req, res) {
        var params = req.params,
            userId = params.user;

        req.file('picture').upload(receiver(userId), function (err, files) {
            if (err) {
                res.serverError(err);
            }
            User
            .update(userId, {picture: '/images/profile/' + files[0].filename})
            .exec(function (err, user) {
                if (err) {
                    return res.serverError(err);
                }
                user = user[0];

                User.publishUpdate(user.id, {
                    picture: user.picture,
                    id: user.id
                });
                return res.send(200);
            });
        });
    }
};

