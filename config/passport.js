const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");

/*const Example = require("../models/Example");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Example.findById(jwt_payload.id)
        .then(ex => {
          if (ex) {
            return done(null, ex);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};*/
