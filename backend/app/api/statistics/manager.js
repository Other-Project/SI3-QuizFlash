const { Attempts, QuestionStats, QuizStats } = require("../../models");

/**
 * This function aggregates the questionStats and attempts from the
 * database to build the entire quizStats
 * @param userId the user id
 * @return {[QuizStats]} the corresponding QuizStats
 */
function buildUserStats(userId) {
    const parsedId = parseInt(userId, 10);
    const userStats = QuizStats.get().filter(quizStat => quizStat.userId === parsedId);
    return userStats.map(quizStat => buildStat(quizStat.id));
}

function buildStat(quizStatId) {
    const quizStat = QuizStats.getById(quizStatId);
    const questionsStats = getQuizStatQuestionStats(quizStatId).map(questionStats => {
        const attempts = getQuestionStatAttempts(questionStats.id);
        return { ...questionStats, attempts };
    });
    return { ...quizStat, questionsStats };
}

/*****************
 * STATISTICS *
 * ****************/

function getSuccessRatePerTry(patientId, quizId, questionType) {
    const patientStats = getPatientQuizzes(patientId, questionType, quizId);
    console.log("patientStats", patientStats);
    return [patientStats.map(stat => stat.quizId), patientStats.map(stat => getRateByFilter([stat], questionType))];
}

function getSuccessRatePerQuestion(patientId, quizId, questionType) {
    let result = getAccumulateQuestionStats(patientId, quizId, questionType);
    return [objectIntKeys(result), Object.values(result).map(question => questionSuccessRate(question) ?? 0)];
}

function getTimePerQuestion(patientId, quizId, questionType) {
    let result = getAccumulateQuestionStats(patientId, quizId, questionType);
    return [objectIntKeys(result), Object.values(result).map(question => average(question.flatMap(q => q.attempts.map(attempt => attempt.timeSpent))) ?? 0)];
}

function getTimePerTry(patientId, quizId, questionType) {
    console.log(quizId);
    const patientStats = getPatientQuizzes(patientId, questionType, quizId);
    return [patientStats.map(stat => stat.quizId), patientStats.map(stat => sum(stat.questionsStats.flatMap(q => q.attempts.map(attempt => attempt.timeSpent))))];
}

/**
 * This function gets all the questionsStats of a QuizStats
 * @param quizStatId
 */
function getQuizStatQuestionStats(quizStatId) {
    const parsedId = parseInt(quizStatId, 10);
    return QuestionStats.get().filter(questionStat => questionStat.quizStatId === parsedId);
}

/**
 * This function gets all the attempts of a questionStat
 * @param questionStatId
 */
function getQuestionStatAttempts(questionStatId) {
    const parsedId = parseInt(questionStatId, 10);
    return Attempts.get().filter(attempt => attempt.questionStatId === parsedId);
}

function getRateByFilter(stats, questionType, successFilter = question => question.success) {
    let result = average(stats.flatMap(quiz => quiz.questionsStats
        .filter(questionStat => isQuestionOfType(questionStat, questionType))
        .map(question => successFilter(question) ? 1 : 0)));
    console.log("result", result);
    return result !== undefined ? result * 100 : -1;
}

function getPatientQuizzes(userId, questionType, quizId) {
    console.log(buildUserStats(userId));
    return buildUserStats(userId).filter(stat => (!quizId || stat.quizId === parseInt(quizId, 10))
        && (!questionType || stat.questionsStats.some(question => isQuestionOfType(question))));
}

/*********
 * UTILS *
 *********/

function questionSuccessRate(questionStats) {
    let result = average(questionStats.map(question => question.success ? 1 : 0));
    return result ? result * 100 : undefined;
}


function getAccumulateQuestionStats(patientId, quizId, questionType) {
    return getPatientQuizzes(patientId, questionType, quizId)
        .flatMap(quiz => quiz.questionsStats.filter(question => isQuestionOfType(question, questionType)))
        .reduce((groups, question) => {
            (groups[question.questionId] ||= []).push(question);
            return groups;
        }, {});
}

function sum(array) {
    return array.reduce((acc, c) => acc + c, 0);
}

function average(array) {
    return array.length === 0 ? undefined : sum(array) / array.length;
}

function isQuestionOfType(questionStat, questionType) {
    return true;
}

function objectIntKeys(object) {
    return Object.keys(object).map(k => parseInt(k, 10));
}

module.exports = {
    buildUserStats,
    getSuccessRatePerTry,
    getSuccessRatePerQuestion,
    getTimePerTry,
    getTimePerQuestion
};