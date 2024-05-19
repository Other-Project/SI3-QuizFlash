const { Attempts, QuestionStats, QuizStats, Question } = require("../../models");
const ValidationError = require("../../utils/errors/validation-error");

const data = {
    try: (userId, quizId, questionType) =>
        getUserQuizzes(userId, questionType, quizId)
            .map(stat => [stat.date.toString(), stat.questionsStats])
            .sort((a, b) => new Date(b[0]) - new Date(a[0])),
    question: (userId, quizId, questionType) =>
        Object.entries(getAccumulateQuestionStats(userId, quizId, questionType))
};

const dataValue = {
    success: value => average(value.map(question => question.success ? 100 : 0)) ?? 0,
    time: value => average(value.flatMap(q => q.attempts.map(attempt => attempt.timeSpent))) ?? 0
};

const generalRates = {
    time: (userId, quizId, questionType) => getTimeData(userId, quizId, questionType),
    success: (userId, quizId, questionType) =>
        ({
            answerHintRate: getAnswerHintRate(userId, quizId, questionType),
            successRate: getSuccessRate(userId, quizId, questionType)
        })
};

/**
 * Returns the data corresponding to the query with specific arguments
 * @param {string} dataType the data type (success/time)
 * @param {string} statType the stat filter (try/question)
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{data: {key: string, value: number}[]}} an object with the requested data
 */

function getRequestedStat(dataType, statType, userId, quizId, questionType) {
    if (!data[statType])
        throw new ValidationError("Invalid statType");
    let result = data[statType](userId, quizId, questionType);

    if (!generalRates[dataType])
        throw new ValidationError("Invalid dataType");
    const rateData = generalRates[dataType](userId, quizId, questionType);

    return {
        ...rateData,
        data: result.map(([key, value]) => ({
            key: key.toString(),
            value: dataValue[dataType](value)
        }))
    };
}

/**
 * Returns the list of quizStats aggregated for a user
 * @param {string} userId the user id
 * @return {(QuizStats&{id: number, questionsStats: *})[]} the corresponding QuizStats
 */
function buildUserStats(userId) {
    const parsedId = parseInt(userId, 10);
    const userStats = QuizStats.get().filter(quizStat => quizStat.userId === parsedId);
    return userStats.map(quizStat => buildStat(quizStat.id));
}

/**
 * This function aggregates the questionStats and attempts from the
 * database to build the entire quizStats
 * @param {string} quizStatId
 * @return {QuizStats&{id: number}&{questionsStats:*}}
 */
function buildStat(quizStatId) {
    const quizStat = QuizStats.getById(quizStatId);
    const questionsStats = getQuizStatQuestionStats(quizStatId).map(questionStats => {
        const attempts = getQuestionStatAttempts(questionStats.id);
        return { ...questionStats, attempts };
    });
    return { ...quizStat, questionsStats };
}

/**
 * This function gets all the questionsStats of a QuizStats
 * @param {string} quizStatId
 * @return {QuestionStats&{id: number}[]}
 */
function getQuizStatQuestionStats(quizStatId) {
    const parsedId = parseInt(quizStatId, 10);
    return QuestionStats.get().filter(questionStat => questionStat.quizStatId === parsedId);
}

/**
 * This function gets all the attempts of a questionStat
 * @param {number} questionStatId
 * @return {Attempts&{id: number}[]}
 */
function getQuestionStatAttempts(questionStatId) {
    return Attempts.get().filter(attempt => attempt.questionStatId === questionStatId);
}

/*****************
 * STATISTICS *
 * ****************/

/**
 * Returns the utilisation rate of answer hint of a user
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {number} the answer hint rate
 */
function getAnswerHintRate(userId, quizId, questionType) {
    return getRateByFilter(getUserQuizzes(userId, questionType, quizId), questionType, question => question.attempts.some(attempt => attempt.answerHint));
}

/**
 * Returns the success rate of a user
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {number} the answer hint rate
 */
function getSuccessRate(userId, quizId, questionType) {
    return getRateByFilter(getUserQuizzes(userId, undefined, quizId), questionType);
}

/**
 * Returns the time data for a user
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{totalTime: number, averageTime: number}} with first the total spent time and secondly the average spent time
 */
function getTimeData(userId, quizId, questionType) {
    return getTimeDataQuizStats(getUserQuizzes(userId, undefined, quizId), questionType);
}

/*********
 * UTILS *
 *********/

function getRateByFilter(stats, questionType, successFilter = question => question.success) {
    let result = average(stats.flatMap(quiz => quiz.questionsStats
        .filter(questionStat => isQuestionOfType(questionStat, questionType))
        .map(question => successFilter(question) ? 1 : 0)));
    return result !== undefined ? result * 100 : -1;
}

function getTimeDataQuizStats(stats, questionType) {
    let timeSpent = stats.flatMap(stat => stat.questionsStats
        .filter(question => isQuestionOfType(question, questionType))
        .flatMap(q => q.attempts.map(attempt => attempt.timeSpent)));
    return { totalTime: sum(timeSpent), averageTime: average(timeSpent) ?? 0 };
}

function getUserQuizzes(userId, questionType, quizId) {
    return buildUserStats(userId).filter(stat => (!quizId || stat.quizId === parseInt(quizId, 10))
        && (!questionType || stat.questionsStats.some(question => isQuestionOfType(question, questionType))));
}

function getAccumulateQuestionStats(userId, quizId, questionType) {
    return getUserQuizzes(userId, questionType, quizId)
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
    const question = Question.get().find(question => question.id === questionStat.questionId);
    return !questionType || (question && question.type === questionType);
}

module.exports = {
    buildUserStats,
    getRequestedStat
};