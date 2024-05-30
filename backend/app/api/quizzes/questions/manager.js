const {Quiz, Question, Answer} = require("../../../models");
const NotFoundError = require("../../../utils/errors/not-found-error.js");
const {getQuestionAnswers} = require("./answers/manager");

/**
 * This function filters among the questions to return only the question linked with the given quizId
 * @param {string|number} quizId
 * @returns {Question[]}
 */
function getQuizQuestions(quizId) {
    const parsedId = parseInt(quizId, 10);
    return Question.get().filter((question) => question.quizId === parsedId);
}

/**
 * This function retrieves a question from a quiz
 * @throws NotFoundError If the questionId doesn't exist or the quizId in the question is different from the one provided in parameter
 * @returns {Question}
 */
function getQuestionFromQuiz(quizId, questionId) {
    const quizIdInt = parseInt(quizId, 10);
    const question = Question.getById(questionId);
    if (question.quizId === quizIdInt) return question;
    const quiz = Quiz.getById(quizId);
    throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id}`);
}

/**
 * Create question entry
 * @param {string|number} quizId
 * @param {Question&{answers: Answer[]}} question
 */
function createQuestion(quizId, question) {
    const {answers, ...pureQuestion} = question;
    let result = Question.create({...pureQuestion, quizId});
    result.answers = answers.map(answer => Answer.create({...answer, questionId: result.id}));
    return result;
}

/**
 * Replace question entry
 * @param {string|number} questionId
 * @param {Question&{answers: Answer[]}} question
 */
function replaceQuestion(questionId, question) {
    const {answers, ...pureQuestion} = question;
    let result = Question.replace(questionId, pureQuestion);
    let currentAnswers = getQuestionAnswers(questionId);
    currentAnswers.filter(answer => answers.every(a => a.id !== answer.id)).forEach(answer => Answer.delete(answer.id));
    result.answers = answers.map(answer => answer.id ? Answer.replace(answer.id, answer) : Answer.create({...answer, questionId: result.id}));
    return result;
}

/**
 * Update question fields
 * @param {string|number} questionId
 * @param {Question&{answers: Answer[]}} question
 */
function updateQuestion(questionId, question) {
    const {answers, ...pureQuestion} = question;
    let result = Question.update(questionId, pureQuestion);
    result.answers = answers.map(answer => answer.id ? Answer.update(answer.id, answer) : Answer.create({...answer, questionId: result.id}));
    return result;
}

/**
 * Delete question entry
 * @param {string|number} questionId
 */
function deleteQuestion(questionId) {
    getQuestionAnswers(questionId).forEach(answer => Answer.delete(answer.id));
    Question.delete(questionId);
}

module.exports = {
    getQuizQuestions,
    createQuestion,
    replaceQuestion,
    updateQuestion,
    deleteQuestion
};