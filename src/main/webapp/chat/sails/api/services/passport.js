var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = sails.models.user;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
    sails.models.user.findOne(userId, done);
});

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, User.authenticate));

passport.use('local-token-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.authenticate(email, password, done, true);
    }));

passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, User.register));

module.exports = passport;
