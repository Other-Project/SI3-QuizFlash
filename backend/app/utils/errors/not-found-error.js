const util = require("util");

function NotFoundError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 404;
}

util.inherits(NotFoundError, Error);

module.exports = NotFoundError;
