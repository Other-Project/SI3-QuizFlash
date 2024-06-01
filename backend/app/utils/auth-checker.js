const AuthorisationError = require("./errors/authorisation-error");
module.exports = function checkAuthentification(minGrade) {
    return function (req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) throw new AuthorisationError(false);
        if (!req.user || !req.user.access < minGrade) throw new AuthorisationError(true);
        next();
    };
};