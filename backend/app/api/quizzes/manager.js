const { Quiz, Question, Answer, QuizStats, QuestionStats, User, Attempts } = require("../../models");
const { getQuizQuestions, createQuestion, updateQuestion, replaceQuestion, deleteQuestion } = require("./questions/manager");
const {getQuestionAnswers} = require("./questions/answers/manager");
const NotFoundError = require("../../utils/errors/not-found-error");

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
        return {...question, answers};
    });
    if (userId) {
        let user = User.getById(userId);
        if (!user.soundQuestion) quiz.questions = quiz.questions.filter(question => question.type !== "Sound");
        questionWithAnswers = questionWithAnswers.sort(() => 0.5 - Math.random()).slice(0, user.numberOfQuestion);
    }
    return {...quiz, questions: questionWithAnswers};
}

/**
 * Create quiz entry
 * @param {Quiz&{questions: (Question&{answers: Answer[]})[]}} quiz
 */
function createQuiz(quiz) {
    const {questions, ...pureQuiz} = quiz;
    let result = Quiz.create(pureQuiz);
    result.questions = questions.map(question => createQuestion(result.id, question));
    return result;
}

/**
 * Replace quiz entry
 * @param {string|number} quizId
 * @param {Quiz&{questions: (Question&{answers: Answer[]})[]}} quiz
 */
function replaceQuiz(quizId, quiz) {
    const {questions, ...pureQuiz} = quiz;
    let result = Quiz.replace(quizId, pureQuiz);
    let currentQuestions = getQuizQuestions(quiz.id);
    currentQuestions.filter(question => questions.every(q => q.id !== question.id)).forEach(question => Question.delete(question.id));
    result.questions = questions.map(question => question.id ? replaceQuestion(question.id, question) : createQuestion(quiz.id, question));
    return result;
}

/**
 * Update quiz fields
 * @param {string|number} quizId
 * @param {Quiz&{questions: (Question&{answers: Answer[]})[]}} quiz
 */
function updateQuiz(quizId, quiz) {
    const {questions, ...pureQuiz} = quiz;
    let result = Quiz.update(quizId, pureQuiz);
    result.questions = questions.map(question => question.id ? updateQuestion(question.id, question) : createQuestion(quiz.id, question));
    return result;
}

/**
 * Delete quiz entry
 * @param {string|number} quizId
 */
function deleteQuiz(quizId) {
    getQuizQuestions(quizId).forEach(question => deleteQuestion(question.id));
    Quiz.delete(quizId);
}

/**
 * Create a new quizStat object
 * @param {string} quizId
 * @param {number} userId
 */
function createStatQuiz(quizId, userId) {
    const date = new Date();
    return QuizStats.create({ quizId: parseInt(quizId), userId: userId, date: date.toISOString().split("T")[0] }).id;
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
 * @param {string | number} questionAttempt
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