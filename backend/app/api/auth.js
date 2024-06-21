const {Router} = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {User} = require("../models");
const crypto = require("crypto");
const AuthenticationError = require("passport/lib/errors/authenticationerror");
const {catchErrors, manageAllErrors} = require("../utils/errors/routes");
const {admin} = require("../models/access-restriction.model");
const AuthorisationError = require("../utils/errors/authorisation-error");


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

// noinspection JSCheckFunctionSignatures
router.post("/login/password",
    passport.authenticate("local", {failWithError: true}),
    (req, res, next) => {
        /*  #swagger.tags = ['Authentication']
            #swagger.summary = 'Login using username and password'
            #swagger.parameters['body'] = {
                in: 'body',
                schema: {
                    username: "My username",
                    password: "My password"
                }
            }
            #swagger.responses[200] = {
                schema: { $ref: '#/definitions/User' }
            }
            #swagger.responses[401] = {
                description: 'Invalid credentials'
            } */
        res.status(200).json(req.user);
    },
    (err, req, res, next) => {
        manageAllErrors(res, new AuthenticationError(err));
    });

router.get("/me", (req, res) => {
    if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) manageAllErrors(res, new AuthorisationError(false));
    else res.status(200).json(req.user);
});

router.post("/logout", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Authentication']
        #swagger.summary = 'Logout'
        #swagger.responses[200] = {
            description: 'Logged out'
        } */
    req.logout(err => catchErrors(req, res, () => {
        if (err) throw new Error(err);
        res.status(200).end();
    }));
}));

module.exports = router;