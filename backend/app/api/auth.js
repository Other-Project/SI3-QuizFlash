const {Router} = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {User} = require("../models");
const NotFoundError = require("../utils/errors/not-found-error");
const crypto = require("crypto");


passport.use(new LocalStrategy({}, (username, password, cb) => {
    let user;
    try {
        user = User.getById(username);
    } catch (e) {
        if (typeof e === NotFoundError) return cb(null, false, {message: "Incorrect username or password."});
        return cb(e);
    }

    crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", function (err, hashedPassword) {
        if (err) return cb(err);
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) return cb(null, false, {message: "Incorrect username or password."});
        return cb(null, user);
    });
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {id: user.id, username: user.username});
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


const router = new Router();


router.post("/login/password", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}));
router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;