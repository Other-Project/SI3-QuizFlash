const util = require("util");

function BadStatFilterError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 400;
}

util.inherits(BadStatFilterError, Error);

module.exports = BadStatFilterError;
