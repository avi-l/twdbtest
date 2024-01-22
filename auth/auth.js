const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/index.js").default;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const secretKey = process.env.SECRET;
const jwtSign = (payload) => {
  return jwt.sign(payload, secretKey);
};

passport.use(
  new JWTStrategy(
    {
      secretOrKey: secretKey,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const user = await User.findByPk(token.id);

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });
        console.log(user.email);
        console.log(`*** user: ${user} ***`);

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await bcrypt.compare(password, user.password);
        console.log(`*** validate: ${validate} ***`);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const {
          body: { name },
        } = req;

        const user = await User.create({
          name: name,
          email: email,
          password: password,
        });
        if (!user) {
          return done(null, false, { message: "Unable to sign up" });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

const authorized = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (error, user) => {
    if (error || !user) {
      let err = new Error("No bueno, no access allowed");
      err.status = 401;
      return next(err);
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = {
  passport,
  jwtSign,
  authorized,
};
