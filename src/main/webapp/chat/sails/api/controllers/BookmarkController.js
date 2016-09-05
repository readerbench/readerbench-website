/**
 * BookmarkController
 *
 * @description
 * Overwrites some default actions provided by sails to provide
 * extra functionality.
 */

module.exports = {
	find: function (req, res) {
        var params = req.params.all();
        _.extend(params, {user: req.session.passport.user});
        Bookmark
            .find(params)
            .populate('message').exec(function (err, bookmarks) {
                if (err) {
                    return res.send(500);
                }

                res.send(bookmarks);
        });
    }
};
