const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");
const passport = require("passport");
const session = require("express-session");

module.exports = (cb) => {
    const app = express();
    const corsOptions = {
        origin: "http://frontend:4200",
        credentials: true
    };
    app.use(cors(corsOptions));
    app.disable("x-powered-by");
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(morgan("[:date[iso]] :method :url :status :response-time ms - :res[content-length]"));
    app.use(session({
        secret: "bmw3NLzcGlEVQNoR3z6M516JFXoILd6N",
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false}
    }));
    app.use(passport.authenticate("session"));
    app.use("/api", api);
    app.use("*", (req, res) => res.status(404).end());
    const server = app.listen(process.env.PORT || 9428, () => cb && cb(server));
};
