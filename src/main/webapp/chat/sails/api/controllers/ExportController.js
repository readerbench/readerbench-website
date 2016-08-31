/**
 * ExportController
 *
 * @description
 * Export chat transcript to JSON & XML
 */

var json2xml = function (messagesJSON, id) {
    var xml = '';
    xml += '<room id="' + id + '">\n';
    _.each(messagesJSON, function (message, id) {
        xml += '\t<message id="' + id + '">\n';
        xml += '\t\t<name>' + message.user + '</name>\n';
        xml += '\t\t<content>' + message.message + '</content>\n';
        xml += '\t\t<created-at>' + message.createdAt + '</created-at>\n';
        _.each(message.link, function (link) {
            xml += '\t\t<link>' + link + '</link>\n';
        });
        xml += '\t</message>\n'
    });
    xml += '</room>';
    console.log("TEST!!!");
    return xml;
};

module.exports = {

    create: function (req, res) {
        var params = req.params,
            query = req.query,
            xml = '<?xml version="1.0" encoding="UTF-8"?>\n';

        if (!params.room || !query.format) {
            return res.end(400);
        }
        Message
        .find()
        .where({room: params.room})
        .populate('user')
        .exec(function (err, messages) {
            if (err) {
                return res.send(500);
            }

            // waterline has no select field functionality atm,
            // manually select which fields to show
            messages = _.map(messages, function (message) {
                message.user = message.user.name;
                return message;
            });

            if (query.format === 'json') {
                res.header('Content-Disposition', 'attachment; filename="transcription.json"');
                return res.json(messages);
            } else if (query.format === 'xml') {
                xml += json2xml(messages, params.room);
                res.header('Content-Type', 'application/xml');
                res.header('Content-Disposition', 'attachment; filename="transcription.xml"');
                return res.send(xml);
            } else {
                return res.send(400);
            }
        });
    }
};

