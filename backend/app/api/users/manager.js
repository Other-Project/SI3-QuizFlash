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

function replaceUser(userId, user) {
    /* const {questions, ...pureQuiz} = quiz;
    let result = Quiz.replace(quizId, pureQuiz);
    let currentQuestions = getQuizQuestions(quiz.id);
    currentQuestions.filter(question => questions.every(q => q.id !== question.id)).forEach(question => Question.delete(question.id));
    result.questions = questions.map(question => question.id ? replaceQuestion(question.id, question) : createQuestion(quiz.id, question));
    return result;
     */
}

function updateUser(userId, user) {
    /* const {questions, ...pureQuiz} = quiz;
    let result = Quiz.update(quizId, pureQuiz);
    result.questions = questions.map(question => question.id ? updateQuestion(question.id, question) : createQuestion(quiz.id, question));
    return result;
     */
}

function deleteUser(userId) {
    /* getQuizQuestions(quizId).forEach(question => deleteQuestion(question.id));
    Quiz.delete(quizId);
     */
}

module.exports = {
    createUser
};