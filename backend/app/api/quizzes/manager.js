const { Quiz, Question, Answer, QuizStats, QuestionStats, User, Attempts } = require("../../models");
const { getQuizQuestions, createQuestion, updateQuestion, replaceQuestion, deleteQuestion } = require("./questions/manager");
const {getQuestionAnswers} = require("./questions/answers/manager");
const NotFoundError = require("../../utils/errors/not-found-error");

/**
 * This function aggregates the questions and answers from the database to build a quiz with all the data needed by the clients
 * @param {string|number} quizId
 * @param {string|number|undefined} userId
 */
function buildQuiz(quizId, userId) {
    const quiz = Quiz.getById(quizId);
    const questions = getQuizQuestions(quiz.id);
    let questionWithAnswers = questions.map((question) => {
        let answers = JSON.parse(JSON.stringify(getQuestionAnswers(question.id)));
        if (userId) {
            answers.map(answer => delete answer.trueAnswer);
        }
        return {...question, answers};
    });
    if (userId) {
        if (!User.getById(userId).soundQuestion) quiz.questions = quiz.questions.filter(question => question.type !== "Sound");
        questionWithAnswers = questionWithAnswers.sort(() => 0.5 - Math.random()).slice(0, User.getById(userId).numberOfQuestion);
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
 * @param {number} quizId
 * @param {number} userId
 * @param {Date} date
 */
function createStatQuiz(quizId, userId, date) {
    return QuizStats.create({ quizId: quizId, userId: userId, date: date }).id;
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
 * @param {string} questionStatId
 * @param {string | number} questionAttempt
 */
//TODO renvoyer la réponse que si le joueur ne rejoue pas la quetsion
function checkAnswer(questionStatId, questionAttempt) {
    let attempt = Attempts.create({ questionStatId: parseInt(questionStatId), ...questionAttempt }).id;
    let result = Answer.get().find(answer => (answer.questionId === parseInt(QuestionStats.getById(questionStatId).questionId)) && answer.trueAnswer);
    if (!result) throw new NotFoundError(`No true answer find in the question ${Question.getById(QuestionStats.getById(Attempts.getById(attempt).questionStatId).questionId).text}`);
    if (result.id === Attempts.getById(attempt).chosenAnswersId) {
        QuestionStats.getById(questionStatId).success = true;
        return result.id.toString();
    } else {
        return result.id.toString();
    }
}

/**
 * Return the answers could be removed to the choice
 * @param {string} questionId
 * @param {number} number
 */
function removedAnswers(questionId, number) {
    let answers = Answer.get().filter(answer => answer.questionId === parseInt(questionId)).filter(answer => !answer.trueAnswer);
    return answers.sort(() => 0.5 - Math.random()).slice(0, number);
}

module.exports = {
    buildQuiz,
    createQuiz,
    replaceQuiz,
    updateQuiz,
    deleteQuiz,
    createStatQuiz,
    createStatQuestion,
    checkAnswer,
    removedAnswers
};