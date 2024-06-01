const AuthorisationError = require("./errors/authorisation-error");
const {catchErrors} = require("./errors/routes");

module.exports = function checkAuthentification(minGrade) {
    return (req, res, next) => catchErrors(req, res, () => {
        if (!req.isAuthenticated || !req.isAuthenticated()) throw new AuthorisationError(false);
        if (!req.user || !req.user.access < minGrade) throw new AuthorisationError(true);
        next();
    });
};