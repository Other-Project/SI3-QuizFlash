const { Quiz, Question, Answer, QuizStats, QuestionStats, User } = require("../../models");
const {getQuizQuestions, createQuestion, updateQuestion, replaceQuestion, getQuestionFromQuiz, deleteQuestion} = require("./questions/manager");
const {getQuestionAnswers} = require("./questions/answers/manager");
const { buildStat } = require("../statistics/manager");

/**
 * This function aggregates the questions and answers from the database to build a quiz with all the data needed by the clients
 * @param {string|number} quizId
 * @param {string|number|undefined} userId
 */
function buildQuiz(quizId, userId) {
    const quiz = Quiz.getById(quizId);
    const questions = getQuizQuestions(quiz.id);
    let questionWithAnswers = questions.map((question) => {
        let answers = getQuestionAnswers(question.id);
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

function createStatQuiz(quizId, userId, date) {
    return QuizStats.create({ quizId: quizId, userId: userId, date: date }).id;
}


function createStatQuestion(quizStatId, questionId) {
    return QuestionStats.create({ quizStatId: quizStatId, questionId: questionId, success: false }).id;
}
module.exports = {
    buildQuiz,
    createQuiz,
    replaceQuiz,
    updateQuiz,
    deleteQuiz,
    createStatQuiz,
    createStatQuestion
};