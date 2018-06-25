const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import helpers from '../../../helpers';

passport.use(new LocalStrategy({
    userNameField: 'login',
    passwordField: 'password',
    session: false
}, function(username, password, done) {
    const user = helpers.findUser(username);
    if (!user || password !== user.password ) {
        return done(null, false, 'Wrong input');
    }
    return done(null, user)
    }
));