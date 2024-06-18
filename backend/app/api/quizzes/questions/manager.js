const { Quiz, Question, Answer } = require("../../../models");
const NotFoundError = require("../../../utils/errors/not-found-error.js");
const { getQuestionAnswers } = require("./answers/manager");
const { storeFile, readFile, deleteFile } = require("../../../utils/file");

const image = (quizId, questionId) => `quizzes/${quizId}/${questionId}/image`;
const sound = (quizId, questionId) => `quizzes/${quizId}/${questionId}/sound`;


/**
 * This function filters among the questions to return only the question linked with the given quizId
 * @param {string|number} quizId
 * @returns {Question[]}
 */
function getQuizQuestions(quizId) {
    const parsedId = parseInt(quizId, 10);
    return Question.get().filter((question) => question.quizId === parsedId).map(question => ({
        ...question,
        imageUrl: readFile(question.imageUrl),
        soundUrl: readFile(question.soundUrl)
    }));
}

/**
 * This function retrieves a question from a quiz
 * @throws NotFoundError If the questionId doesn't exist or the quizId in the question is different from the one provided in parameter
 * @returns {Question}
 */
function getQuestionFromQuiz(quizId, questionId) {
    const quizIdInt = parseInt(quizId, 10);
    const question = Question.getById(questionId);

    if (question.quizId === quizIdInt) return {
        ...question,
        imageUrl: readFile(question.imageUrl),
        soundUrl: readFile(question.soundUrl)
    };
    const quiz = Quiz.getById(quizId);
    throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id}`);
}

/**
 * Create question entry
 * @param {string|number} quizId
 * @param {Question&{answers: Answer[]}} question
 */
function createQuestion(quizId, question) {
    const { answers, imageUrl, soundUrl, ...pureQuestion } = question;

    // For the validation
    pureQuestion.imageUrl = imageUrl ? "ok" : undefined;
    pureQuestion.soundUrl = soundUrl ? "ok" : undefined;

    let result = Question.create({ ...pureQuestion, quizId });
    Question.update(result.id, {
        imageUrl: storeFile(image(result.quizId, result.id), imageUrl),
        soundUrl: storeFile(sound(result.quizId, result.id), soundUrl)
    });
    if (answers !== undefined) return { ...result, imageUrl, soundUrl, answers: answers.map(answer => Answer.create({ ...answer, questionId: result.id })) };
    return { ...result, imageUrl, soundUrl };
}

/**
 * Replace question entry
 * @param {string|number} quizId
 * @param {string|number} questionId
 * @param {Question&{answers: Answer[]}} question
 */
function replaceQuestion(quizId, questionId, question) {
    const { answers, imageUrl, soundUrl, ...pureQuestion } = question;

    if (typeof quizId === "string") quizId = parseInt(quizId, 10);
    const questionInDb = Question.getById(questionId);
    if (questionInDb.quizId !== quizId)
        throw new NotFoundError(`${questionInDb.name} id=${questionId} was not found for ${Quiz.getById(quizId).name} id=${quizId}`);

    deleteFile(questionInDb.imageUrl);
    deleteFile(questionInDb.soundUrl);
    pureQuestion.imageUrl = storeFile(image(quizId, questionId), imageUrl);
    pureQuestion.soundUrl = storeFile(sound(quizId, questionId), soundUrl);
    let result = Question.replace(questionId, pureQuestion);

    if (answers !== undefined) {
        let currentAnswers = getQuestionAnswers(questionId);
        currentAnswers.filter(answer => answers.every(a => a.id !== answer.id)).forEach(answer => Answer.delete(answer.id));
        return {
            ...result, imageUrl, soundUrl,
            answers: answers.map(answer => answer.id ? Answer.replace(answer.id, answer) : Answer.create({ ...answer, questionId: result.id }))
        };
    }
    return result;
}

/**
 * Update question fields
 * @param {string|number} quizId
 * @param {string|number} questionId
 * @param {Question&{answers: Answer[]}} question
 */
function updateQuestion(quizId, questionId, question) {
    const { answers, imageUrl, soundUrl, ...pureQuestion } = question;

    if (typeof quizId === "string") quizId = parseInt(quizId, 10);
    const questionInDb = Question.getById(questionId);
    if (questionInDb.quizId !== quizId)
        throw new NotFoundError(`${questionInDb.name} id=${questionId} was not found for ${Quiz.getById(quizId).name} id=${quizId}`);

    deleteFile(questionInDb.imageUrl);
    deleteFile(questionInDb.soundUrl);
    pureQuestion.imageUrl = storeFile(image(quizId, questionId), imageUrl);
    pureQuestion.soundUrl = storeFile(sound(quizId, questionId), soundUrl);
    let result = Question.update(questionId, pureQuestion);

    if (answers !== undefined) return {
        ...result, imageUrl, soundUrl,
        answers: answers.map(answer => answer.id ? Answer.update(answer.id, answer) : Answer.create({ ...answer, questionId: result.id }))
    };
    return { ...result, imageUrl, soundUrl };
}

/**
 * Delete question entry
 * @param {string|number} quizId
 * @param {string|number} questionId
 */
function deleteQuestion(quizId, questionId) {
    if (typeof quizId === "string") quizId = parseInt(quizId, 10);
    const question = Question.getById(questionId);
    if (question.quizId !== quizId)
        throw new NotFoundError(`${question.name} id=${questionId} was not found for ${Quiz.getById(quizId).name} id=${quizId}`);
    getQuestionAnswers(questionId).forEach(answer => Answer.delete(answer.id));
    deleteFile(question.imageUrl);
    deleteFile(question.soundUrl);
    Question.delete(questionId);
}

/**
 * Returns the answers to remove from the choices
 * @param {string} questionId
 */
function removedAnswers(questionId) {
    let answers = Answer.get().filter(answer => answer.questionId === parseInt(questionId));
    if (answers.length < 3) return [];
    let answersRemoved = answers.filter(answer => !answer.trueAnswer);
    return answersRemoved.sort(() => 0.5 - Math.random()).slice(0, answers.length / 2);
}

module.exports = {
    getQuizQuestions,
    getQuestionFromQuiz,
    createQuestion,
    replaceQuestion,
    updateQuestion,
    deleteQuestion,
    removedAnswers
};