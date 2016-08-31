/**
* User.js
*
* @description
* Describes the structure of the user model.
*/

var bcrypt = require('bcrypt-nodejs'),
    jwt = require('jwt-simple');

module.exports = {

    attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: 'string',
            required: false
        },

        email: {
            type: 'email',
            email: true,
            required: true,
            unique: true
        },

        password: {
            type: 'string',
            minLength: 4,
            required: true
        },

        confirmed: {
            type: 'boolean',
            defaultsTo: false
        },

        picture: {
            type: 'string',
            required: false
        },

        // online, busy, invisible, offline
        status: {
            type: 'string',
            defaultsTo: 'online'
        },

        online: {
            type: 'boolean',
            defaultsTo: false
        },

        friends: {
            collection: 'User',
            via: 'friends'
        },

        bookmarks: {
            collection: 'Bookmark',
            via: 'user'
        },

        messages: {
            collection: 'Message',
            via: 'user'
        },

        rooms: {
            collection: 'Room',
            via: 'users',
            dominant: true
        },

        toJSON: function () {
            var model = this.toObject();
            delete model.password;
            delete model.confirmed;

            // if (model.status === 'invisible') {
            //     model.status = 'offline';
            // }
            return model;
        },
    },

    generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    },

    getSecret: function () {
        return 'secret-key';
    },

    toToken: function (payload) {
        payload = _.pick(payload, 'id', 'email', 'password');
        return jwt.encode(payload, this.getSecret());
    },

    fromToken: function (token) {
        return jwt.decode(token, this.getSecret());
    },

    authenticate: function (email, password, done, withToken) {
        User
        .findOne({email: email})
        .exec(function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, null);
            }

            if (withToken) {
                if (password !== user.password) {
                    return done(null, null);
                }
            } else if (!bcrypt.compareSync(password, user.password)) {
                return done(null, null);
            }

            // save the user state in the database
            user.online = true;
            User.update(user.id, {online: true}, function (err) {
                if (err) {
                    return done(err);
                }

                User.publishUpdate(user.id, {
                    online: true,
                    id: user.id
                });

                user.token = User.toToken(user);
                return done(null, user);
            });
        });
    },

    register: function (req, email, password, done) {
        User
        .findOne({email: email})
        .exec(function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, null, 'A user with this email is already registered.');
            }

            User
            .create({
                name: req.body.name,
                email: email,
                password: User.generateHash(password),
                online: true
            })
            .exec(function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    user.token = User.toToken(user);
                    return done(null, user);
                }
            });
        });
    }

};


