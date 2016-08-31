/**
 * LanguageController
 *
 * @description :: Server-side logic for managing Languages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	detect: function (req, res) {
        var text = req.body.text,
            detection;
        if (text) {
            detection = lngDetector.detect(text);
            return res.json({language: detection[0][0]});
        }

        return res.json(501, {message: 'No input was given.'});
    },

    translate: function (req, res) {
        var text = req.body.text,
            to = req.body.to;

        if (text && to) {
            Translate.translate({
                text: text,
                to: to
            }, function (err, data) {
                if (err) {
                    res.send(501, {message: 'Cannot translate ' + text + '.'});
                }
                res.json({text: data});
            });
        } else {
            return res.json(501, {message: 'No input was given.'});
        }
    }
};
