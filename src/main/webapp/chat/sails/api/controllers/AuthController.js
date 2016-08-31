/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport'),
    AuthCtrl = {
        authenticate: function (method, req, res) {
            passport.authenticate(method, function (err, user, info) {
                if (err) {
                    return res.send(500);
                }

                if (!user) {
                    return res.json({status: 'error', message: info || 'Bad credentials.'});
                }

                if (!user.token) {
                    return res.json({status: 'error', message: 'Could not generate login token.'});
                }

                req.login(user, function (err) {
                    if (err) {
                        return res.json({status: 'error', message: 'Server error.'});
                    }

                    return res.json({
                        status: 'ok',
                        data: _.pick(user, 'id', 'email', 'name', 'picture', 'status', 'token')
                    });
                });
            })(req, res);
        }
    };

module.exports = {

	login: function (req, res) {
        AuthCtrl.authenticate('local-login', req, res);
    },

    tokenLogin: function (req, res) {
        var user = User.fromToken(req.body.token);
        req.body.email = user.email;
        req.body.password = user.password;
        AuthCtrl.authenticate('local-token-login', req, res);
    },

    signup: function (req, res) {
        AuthCtrl.authenticate('local-signup', req, res);
    },

    forgot: function (req, res) {

    },

    logout: function (req, res) {
        User.findOne(req.session.passport.user, function (err, user) {
            if (err) {
                return res.json({status: 'error'});
            }
            User.update(user.id, {online: false}, function (err) {
                if (err) {
                    return res.json({status: 'error'});
                }

                User.publishUpdate(user.id, {
                    online: false,
                    id: user.id
                });

                req.logout();
                res.json({status: 'ok'});
            });
        });
    },

    getSessionId: function (req, res) {
        res.send(req.sessionID);
    }
};
