const { Quiz, Question } = require("../../../models");
const NotFoundError = require("../../../utils/errors/not-found-error.js");

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

/**
 * This function filters among the questions to return only the question linked with the given quizId
 * @param {string|number} quizId
 */
function getQuizQuestions(quizId) {
    const parsedId = parseInt(quizId, 10);
    return Question.get().filter((question) => question.quizId === parsedId);
};

/**
 * This function retrieves a question from a quiz
 * @throws NotFoundError If the questionId doesn't exist or the quizId in the question is different from the one provided in parameter
 */
function getQuestionFromQuiz(quizId, questionId) {
    const quizIdInt = parseInt(quizId, 10);
    const question = Question.getById(questionId);
    if (question.quizId === quizIdInt) return question;

    const quiz = Quiz.getById(quizId);
    throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id}`);
};

module.exports = {
    getQuizQuestions,
    getQuestionFromQuiz
};