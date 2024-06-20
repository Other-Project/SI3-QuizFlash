const { getTags } = require("../quizzes/manager");
const { getHobbies } = require("../users/manager");

function getAllTags() {
    let tags = getTags();
    let hobbies = getHobbies();
    return [...new Set(tags.concat(hobbies))];
}

module.exports = {
    getAllTags
};