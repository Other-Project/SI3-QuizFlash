const util = require("util");

function AuthorisationError(isAuthenticated, message = undefined) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || (isAuthenticated ? "Access denied" : "Authentication required");
    this.code = isAuthenticated ? 403 : 401;
}

util.inherits(AuthorisationError, Error);

module.exports = AuthorisationError;
