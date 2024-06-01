const {Router} = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {User} = require("../models");
const crypto = require("crypto");
const AuthenticationError = require("passport/lib/errors/authenticationerror");
const {catchErrors} = require("../utils/errors/routes");
const {admin} = require("../models/access-restriction.model");


passport.use(new LocalStrategy({}, (username, password, cb) => {
    let user;
    try {
        user = User.getById(username);
    } catch (e) {
        if (e.name === "NotFoundError") return cb("Incorrect username or password", false);
        return cb(e);
    }

    if (user.access < admin) return cb(null, user);

    crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", function (err, hashedPassword) {
        console.log(hashedPassword.toString("base64"));
        if (err) return cb(err);
        if (!crypto.timingSafeEqual(Buffer.from(user.password, "base64"), hashedPassword)) return cb("Incorrect username or password", false);
        return cb(null, user);
    });
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {id: user.id});
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, User.getById(user.id));
    });
});


const router = new Router();


router.post("/login/password", (req, res) => catchErrors(req, res, () =>
    passport.authenticate("local", {failWithError: true}, (err, user) => catchErrors(req, res, () => {
        if (err || !user) throw new AuthenticationError(err);
        res.status(200).json(user);
    }))(req, res)));

router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) return next(err);
        res.status(200).end();
    });
});

module.exports = router;