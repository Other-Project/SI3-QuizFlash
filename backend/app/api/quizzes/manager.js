const { Quiz } = require("../../models");
const { getQuizQuestions } = require("./questions/manager");
const { getQuestionAnswers } = require("./questions/answers/manager");

/**
 * This function aggregates the questions and answers from the database to build a quiz with all the data needed by the clients
 * @param {string|number} quizId
 */
function buildQuiz(quizId) {
    const quiz = Quiz.getById(quizId);
    const questions = getQuizQuestions(quiz.id);
    const questionWithAnswers = questions.map((question) => {
        const answers = getQuestionAnswers(question.id);
        return { ...question, answers };
    });
    return { ...quiz, questions: questionWithAnswers };
};

/**
 * This function aggregates the questions and answers from the database to build entire quizzes
 */
function buildQuizzes() {
    const quizzes = Quiz.get();
    return quizzes.map((quiz) => buildQuiz(quiz.id));
};

module.exports = {
    buildQuiz,
    buildQuizzes
};