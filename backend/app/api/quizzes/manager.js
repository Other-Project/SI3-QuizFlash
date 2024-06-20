const { Quiz, Question, Answer, QuizStats, QuestionStats, User, Attempts } = require("../../models");
const { getQuizQuestions, createQuestion, updateQuestion, replaceQuestion, deleteQuestion } = require("./questions/manager");
const { getQuestionAnswers } = require("./questions/answers/manager");
const NotFoundError = require("../../utils/errors/not-found-error");
const { readFile, storeFile, deleteFile } = require("../../utils/file");

const thumbnail = (quizId) => `quizzes/${quizId}/thumbnail`;

/**
 * This function aggregates the questions and answers from the database to build a quiz with all the data needed by the clients
 * @param {string|number} quizId
 * @param {string|number|undefined} userId
 */
function buildQuiz(quizId, userId = undefined) {
    const quiz = Quiz.getById(quizId);
    const questions = getQuizQuestions(quiz.id);
    let questionWithAnswers = questions.map((question) => {
        let answers = structuredClone(getQuestionAnswers(question.id));
        if (userId) answers.forEach(answer => delete answer.trueAnswer);
        return { ...question, answers };
    });
    if (userId) {
        let user = User.getById(userId);
        if (!user.soundQuestion) questionWithAnswers = questionWithAnswers.filter(question => question.type !== "Sound");
        questionWithAnswers = questionWithAnswers.sort(() => 0.5 - Math.random()).slice(0, user.numberOfQuestion);
    }
    return { ...quiz, thumbnailUrl: readFile(quiz.thumbnailUrl), questions: questionWithAnswers };
}

/**
 * Create quiz entry
 * @param {Quiz&{questions: (Question&{answers: Answer[]})[]}} quiz
 */
function createQuiz(quiz) {
    const { questions, thumbnailUrl, ...pureQuiz } = quiz;
    let result = Quiz.create(pureQuiz);
    Quiz.update(result.id, { thumbnailUrl: storeFile(thumbnail(result.id), thumbnailUrl) });
    if (questions !== undefined) return { ...result, thumbnailUrl, questions: questions.map(question => createQuestion(result.id, question)) };
    return { ...result, thumbnailUrl };
}

/**
 * Replace quiz entry
 * @param {string|number} quizId
 * @param {Quiz&{questions: (Question&{answers: Answer[]})[]}} quiz
 */
function replaceQuiz(quizId, quiz) {
    const { questions, thumbnailUrl, ...pureQuiz } = quiz;

    const previousQuiz = Quiz.getById(quizId);
    pureQuiz.thumbnailUrl = storeFile(thumbnail(quizId), thumbnailUrl);
    if (pureQuiz.thumbnailUrl && previousQuiz.thumbnailUrl !== pureQuiz.thumbnailUrl) deleteFile(previousQuiz.thumbnailUrl);
    let result = Quiz.replace(quizId, pureQuiz);

    if (questions !== undefined) {
        let currentQuestions = getQuizQuestions(quiz.id);
        currentQuestions.filter(question => questions.every(q => q.id !== question.id)).forEach(question => Question.delete(question.id));
        currentQuestions = questions.map(question => question.id ? replaceQuestion(quizId, question.id, question) : createQuestion(quiz.id, question));
        return { ...result, thumbnailUrl, questions: currentQuestions };
    }
    return { ...result, thumbnailUrl };
}

/**
 * Update quiz fields
 * @param {string|number} quizId
 * @param {Quiz&{questions: (Question&{answers: Answer[]})[]}} quiz
 */
function updateQuiz(quizId, quiz) {
    const { questions, thumbnailUrl, ...pureQuiz } = quiz;

    const previousQuiz = Quiz.getById(quizId);
    pureQuiz.thumbnailUrl = storeFile(thumbnail(quizId), thumbnailUrl);
    if (pureQuiz.thumbnailUrl && previousQuiz.thumbnailUrl !== pureQuiz.thumbnailUrl) deleteFile(previousQuiz.thumbnailUrl);
    let result = Quiz.update(quizId, pureQuiz);

    if (questions !== undefined)
        return {
            ...result,
            thumbnailUrl,
            questions: questions.map(question => question.id ? updateQuestion(quizId, question.id, question) : createQuestion(quiz.id, question))
        };
    return { ...result, thumbnailUrl };
}

/**
 * Delete quiz entry
 * @param {string|number} quizId
 */
function deleteQuiz(quizId) {
    const quiz = Quiz.getById(quizId);
    getQuizQuestions(quizId).forEach(question => deleteQuestion(quizId, question.id));
    deleteFile(quiz.thumbnailUrl);
    Quiz.delete(quizId);
}

/**
 * Create a new quizStat object
 * @param {string} quizId
 * @param {number} userId
 */
function createStatQuiz(quizId, userId) {
    const date = new Date();
    return QuizStats.create({ quizId: parseInt(quizId), userId: userId, date: date.toISOString() }).id;
}

/**
 * Create a new questionStat object
 * @param {string} quizStatId
 * @param {string} questionId
 */
function createStatQuestion(quizStatId, questionId) {
    return QuestionStats.create({ quizStatId: parseInt(quizStatId), questionId: parseInt(questionId), success: false }).id;
}

/**
 * Check if the answer is good or not
 * @param {string} quizStatId
 * @param {string} questionStatId
 * @param {Attempts} questionAttempt
 * @param {string} userId
 */
function checkAnswer(quizStatId, questionStatId, questionAttempt, userId) {
    let attempt = Attempts.create({ questionStatId: parseInt(questionStatId), ...questionAttempt });
    let questionStats = QuestionStats.getById(questionStatId);
    if (parseInt(quizStatId) !== questionStats.quizStatId) throw new NotFoundError(`The quizStatId ${quizStatId} does not contain the questionStat with id ${questionStatId}`);
    let result = Answer.get().find(answer => answer.questionId === questionStats.questionId && answer.trueAnswer);
    if (!result) throw new NotFoundError(`No true answer found in the question ${Question.getById(questionStats.questionId).text}`);
    if (result.id === attempt.chosenAnswersId) {
        QuestionStats.update(questionStatId, { success: true });
        questionStats.success = true;
    } else if (User.getById(parseInt(userId)).removeAnswers) return { isTrue: false };
    return { isTrue: questionStats.success, expected: { id: result.id, text: result.answerText } };
}

module.exports = {
    buildQuiz,
    createQuiz,
    replaceQuiz,
    updateQuiz,
    deleteQuiz,
    createStatQuiz,
    createStatQuestion,
    checkAnswer
};