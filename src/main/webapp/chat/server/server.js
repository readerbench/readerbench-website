var _ = require('underscore'),
    express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    MsTranslator = require('mstranslator'),
    client = new MsTranslator({
        client_id: config.api.translator.clientId,
        client_secret: config.api.translator.secretId
    }),
    Firebase = require('firebase'),
    app = express();

var rooms = new Firebase('https://shining-fire-3208.firebaseIO.com/rooms');
var replies = new Firebase('https://shining-fire-3208.firebaseIO.com/replies');

var LanguageDetect = require('languagedetect');
var lngDetector = new LanguageDetect();

var server = app.listen(8000, function () {
    console.log('Listening on port %d', server.address().port);
});

var json2xml = function (json, id) {
    var xml = '';
    xml += '<room id="' + id + '">\n';
    _.each(json, function (reply, replyId) {
        xml += '\t<reply id="' + replyId + '">\n';
        xml += '\t\t<name>' + reply.from + '</name>\n';
        xml += '\t\t<content>' + reply.content + '</content>\n';
        xml += '\t\t<created-at>' + reply.createdAt + '</created-at>\n';
        _.each(reply.link, function (link) {
            xml += '\t\t<link>' + link + '</link>\n';
        });
        xml += '\t</reply>\n'
    });
    xml += '</room>';
    return xml;
};

app.use(function (req, res, next)  {
    res.header('Access-Control-Allow-Origin', config.allowedDomains.join(','));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser());

app.get('/rooms', function (req, res) {
    rooms.on('value', function (snapshot) {
        if (snapshot.val() === null) {
            return res.send('No data');
        }

        res.send(snapshot.val());
    });
});

app.get('/api/v1/reply/:roomId/format/:format', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');

    var params = req.params, xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    replies.on('value', function (snapshot) {
        if (snapshot.val() === null) {
            return res.send('No data');
        }
        var room = snapshot.val()[params.roomId];
        if (params.format === 'json') {
            res.header('Content-Disposition', 'attachment; filename="transcription.json"');
            return res.send(room);
        } else if (params.format === 'xml') {
            xml += json2xml(room, params.roomId);
            res.header('Content-Type', 'application/xml');
            res.header('Content-Disposition', 'attachment; filename="transcription.xml"');
            return res.send(xml);
        } else {
            return res.send('Unkwown format')
        }
    });
});

app.post('/api/v1/language/detect', function (req, res) {
    var text = req.body.text,
        detection;
    if (text) {
        detection = lngDetector.detect(text);
        return res.json({language: detection[0][0]});
    }

    return res.json(501, {message: 'No input was given.'});
});

app.post('/api/v1/language/translate', function (req, res) {
    var text = req.body.text,
        from = req.body.from,
        to = req.body.to;

    if (text && from && to) {
        client.translate({
            text: text,
            from: from,
            to: to
        }, function (err, data) {
            if (err) {
                res.send(501, {message: 'Cannot translate ' + text + '.'});
            }
            res.json({text: data});
        });
    }

    return res.json(501, {message: 'No input was given.'});
});

client.initialize_token();
