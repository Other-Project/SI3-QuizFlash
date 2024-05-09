const { Answer } = require("../../../../models");
const NotFoundError = require("../../../../utils/errors/not-found-error.js");
const { getQuestionFromQuiz } = require("../manager");

/**
 * This function filters among the questions to return only the question linked with the given quizId
 * @param {string|number} questionId
 */
function getQuestionAnswers(questionId) {
    return Answer.get().filter(answer => answer.questionId === questionId);
}

/**
 * This function retrieves an answer from a question
 * @param {string|number} quizId
 * @param {string|number} questionId
 * @param {string|number} answerId
 * @throws NotFoundError If the answerId doesn't exist or the quizId/questionId in the answer is different from the one provided in parameter
 */
function getAnswerFromQuestion(quizId, questionId, answerId) {
    const question = getQuestionFromQuiz(quizId, questionId);
    const answer = Answer.getById(answerId);
    if (answer.questionId !== question.id)
        throw new NotFoundError(`${answer.name} id=${answerId} was not found for ${question.name} id=${question.id} : not found`);
    return answer;
}

module.exports = {
    getAnswerFromQuestion,
    getQuestionAnswers
};