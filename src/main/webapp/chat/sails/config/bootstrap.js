/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function (cb) {

    var passport = require('passport'),
        http = require('http'),
        MsTranslator = require('mstranslator'),
        client = new MsTranslator({
            client_id: sails.config.api.translator.clientId,
            client_secret: sails.config.api.translator.secretId
        }),
        methods = ['login', 'logout', 'isAuthenticated', 'isUnauthenticated'];

    Translate.initialize(client);

    sails.removeAllListeners('router:request');
    sails.on('router:request', function (req, res) {
        passport.initialize()(req, res, function () {
            passport.session()(req, res, function (err) {
                var idx, len;
                if (err) {
                    return res.send(500);
                }
                for (idx = 0, len = methods.length; idx < len; ++idx) {
                    req[methods[idx]] = http.IncomingMessage.prototype[methods[idx]].bind(req);
                }
                sails.router.route(req, res);
            });
        });
    });

    cb();
};
