const util = require("util");

function BadStatTypeError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 400;
}

util.inherits(BadStatTypeError, Error);

module.exports = BadStatTypeError;
