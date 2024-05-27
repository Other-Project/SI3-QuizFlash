const AccessRestriction = require("../../models/access-restriction.model");
const { User } = require("../../models");

/**
 * Create user entry
 *
 */
function createUser(user) {
    user.access = AccessRestriction.user;
    return User.create(user);
}

module.exports = {
    createUser
};