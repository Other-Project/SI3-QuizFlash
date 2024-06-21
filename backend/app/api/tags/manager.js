const { Quiz, User } = require("../../models");

function getAllTags() {
    let tags = Quiz.get().map(quiz => quiz.tags ?? []).flat();
    let hobbies = User.get().map(user => user.hobbies ?? []).flat();
    return [...new Set(tags.concat(hobbies))].sort();
}

module.exports = {
    getAllTags
};