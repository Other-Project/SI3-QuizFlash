const { Attempts, QuestionStats, QuizStats, Question } = require("../../models");
const ValidationError = require("../../utils/errors/validation-error");

const statFunctions = {
    success: {
        try: getSuccessRatePerTry,
        question: getSuccessRatePerQuestion
    },
    time: {
        try: getTimePerTry,
        question: getTimePerQuestion
    }
};

/**
 * Returns the data corresponding to the query with specific arguments
 * @param {string} dataType the data type (success/time)
 * @param {string} statType the stat filter (try/question)
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{}} an object with the requested data
 */
function getRequestedStat(dataType, statType, userId, quizId, questionType) {
    checkStatType(dataType, statType);
    if (dataType === "success")
        return getSuccessRateStats(dataType, statType, userId, quizId, questionType);
    if (dataType === "time")
        return getTimeStats(dataType, statType, userId, quizId, questionType);
    throw new ValidationError("Invalid dataType");
}

/**
 * Returns the success rate stats
 * @param {string} dataType the data type (success/time)
 * @param {string} statType the stat type (try/question)@param {string} userId the user id
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{successRate: number, graphData: [string[], number[]]}}
 */
function getSuccessRateStats(dataType, statType, userId, quizId, questionType) {
    return {
        answerHintRate: getAnswerHintRate(userId, quizId, questionType),
        successRate: getSuccessRate(userId, quizId, questionType),
        graphData: statFunctions[dataType][statType](userId, quizId, questionType)
    };
}

/**
 * Returns the success time stats
 * @param {string} dataType the data type (success/time)
 * @param {string} statType the stat type (try/question)
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{totalTime: number, averageTime: number, graphData: [string[], number[]]}}
 */
function getTimeStats(dataType, statType, userId, quizId, questionType) {
    return {
        ...getTimeData(userId, quizId, questionType),
        graphData: statFunctions[dataType][statType](userId, quizId, questionType)
    };
}

/**
 * Check if the statType is correct
 * @param dataType the data type (success/time)
 * @param statType the stat type (try/question)
 */
function checkStatType(dataType, statType) {
    if (!statFunctions[dataType][statType])
        throw new ValidationError("Invalid statType");
}

/**
 * Returns the list of quizStats aggregated for a user
 * @param {string} userId the user id
 * @return {(QuizStats&{id: number}&{questionsStats: *})[]} the corresponding QuizStats
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

/**
 * Gets the success rate per try
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{key: string, value:number}[]} with the quiz field as key and the corresponding value
 */
function getSuccessRatePerTry(userId, quizId, questionType) {
    const userStats = getUserQuizzes(userId, questionType, quizId);
    return userStats.map(stat => ({
        key: stat.date.toString(),
        value: getRateByFilter([stat], questionType)
    }));
}

/**
 * Gets the success rate per question
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{key: string, value:number}[]} with the quiz field as key and the corresponding value
 */
function getSuccessRatePerQuestion(userId, quizId, questionType) {
    let result = getAccumulateQuestionStats(userId, quizId, questionType);
    return Object.keys(result).map(questionId => ({
        key: questionId.toString(),
        value: questionSuccessRate(result[questionId]) ?? 0
    }));
}

/**
 * Gets the average time per question
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{key: string, value:number}[]} with first the question ids and secondly corresponding the averages
 */
function getTimePerQuestion(userId, quizId, questionType) {
    let result = getAccumulateQuestionStats(userId, quizId, questionType);
    return Object.keys(result).map(questionId => ({
        key: questionId.toString(),
        value: average(result[questionId].flatMap(q => q.attempts.map(attempt => attempt.timeSpent))) ?? 0
    }));
}

/**
 * Gets the total time per try
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{key: string, value:number}[]} with first the quiz ids and secondly the corresponding total times
 */
function getTimePerTry(userId, quizId, questionType) {
    const userStats = getUserQuizzes(userId, questionType, quizId);
    return userStats.map(stat => ({
        key: stat.date.toString(),
        value: sum(stat.questionsStats.flatMap(q => q.attempts.map(attempt => attempt.timeSpent)))
    }));
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

function questionSuccessRate(questionStats) {
    let result = average(questionStats.map(question => question.success ? 1 : 0));
    return result ? result * 100 : undefined;
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