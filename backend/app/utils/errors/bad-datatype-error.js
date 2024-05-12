const util = require("util");

function BadDataTypeError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 400;
}

util.inherits(BadDataTypeError, Error);

module.exports = BadDataTypeError;
