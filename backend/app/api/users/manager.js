const AccessRestriction = require("../../models/access-restriction.model");
const { User } = require("../../models");
const { storeFile, readFile, deleteFile, validateAndNormaliseFile } = require("../../utils/file");

const picture = (userId) => `users/${userId}/picture`;

/**
 * Create user entry
 *
 */
function createUser(user) {
    const { pictureUrl, ...pureUser } = user;
    pureUser.access = AccessRestriction.user;
    const pict = validateAndNormaliseFile(pictureUrl, /image\/.*/);
    let result = User.create(pureUser);
    User.update(result.id, { pictureUrl: storeFile(picture(result.id), ...pict) });
    return { ...result, pictureUrl };
}

function replaceUser(userId, user) {
    const { pictureUrl, ...pureUser } = user;
    const previousUser = User.getById(userId);
    pureUser.pictureUrl = storeFile(picture(userId), ...validateAndNormaliseFile(pictureUrl, /image\/.*/));
    if (pureUser.pictureUrl && previousUser.pictureUrl !== pureUser.pictureUrl) deleteFile(previousUser.pictureUrl);
    const result = User.replace(userId, pureUser);
    return { ...result, pictureUrl: readFile(result.pictureUrl) };
}

function updateUser(userId, user) {
    const { pictureUrl, ...pureUser } = user;
    const previousUser = User.getById(userId);
    pureUser.pictureUrl = storeFile(picture(userId), ...validateAndNormaliseFile(pictureUrl, /image\/.*/));
    if (pureUser.pictureUrl && previousUser.pictureUrl !== pureUser.pictureUrl) deleteFile(previousUser.pictureUrl);
    const result = User.update(userId, pureUser);
    return { ...result, pictureUrl: readFile(result.pictureUrl) };
}

function deleteUser(userId) {
    const user = User.getById(userId);
    deleteFile(user.pictureUrl);
    User.delete(userId);
}

module.exports = {
    createUser,
    replaceUser,
    updateUser,
    deleteUser
};