const { Attempts, QuestionStats, QuizStats, Question } = require("../../models");
const ValidationError = require("../../utils/errors/validation-error");

const data = {
    try: (userId, quizId, questionType, userQuizzes) =>
        userQuizzes.map(stat => [stat.date.toString(), stat.questionsStats])
            .sort((a, b) => new Date(b[0]) - new Date(a[0])),
    question: (userId, quizId, questionType, userQuizzes) =>
        Object.entries(getAccumulateQuestionStats(userId, quizId, questionType, userQuizzes))
};

const dataValue = {
    success: value => average(value.map(question => question.success ? 100 : 0)) ?? 0,
    time: value => average(value.flatMap(q => q.attempts.map(attempt => attempt.timeSpent))) ?? 0
};

const generalRates = {
    success: questionsStats => ({
        answerHintRate: getRateByFilter(questionsStats, question => question.attempts.some(attempt => attempt.answerHint)),
        successRate: getRateByFilter(questionsStats)
    }),
    time: questionsStats => {
        let timeSpent = questionsStats.flatMap(q => q.attempts.map(attempt => attempt.timeSpent));
        return { totalTime: sum(timeSpent), averageTime: average(timeSpent) ?? 0 };
    }
};

/**
 * Returns the data corresponding to the query with specific arguments
 * @param {string} dataType the data type (success/time)
 * @param {string} statType the stat filter (try/question)
 * @param {string} userId the user id
 * @param {string|undefined} quizId the quiz id
 * @param {string|undefined} questionType the question type
 * @return {{[p: string]: *}} an object with the requested data
 */

function getRequestedStat(dataType, statType, userId, quizId, questionType) {
    if (!data[statType])
        throw new ValidationError("Invalid statType");
    if (!generalRates[dataType])
        throw new ValidationError("Invalid dataType");

    const userQuizzes = getUserQuizzes(userId, questionType, quizId);
    let result = data[statType](userId, quizId, questionType, userQuizzes);
    const rateData = generalRates[dataType](userQuizzes.flatMap(stat => stat.questionsStats));

    return {
        ...rateData,
        data: result.map(([key, value]) => ({
            key: key.toString(),
            value: dataValue[dataType](value.filter(question => isQuestionOfType(question, questionType)))
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
 * @param {number} quizStatId
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
 * @param {number} quizStatId
 * @return {QuestionStats&{id: number}[]}
 */
function getQuizStatQuestionStats(quizStatId) {
    return QuestionStats.get().filter(questionStat => questionStat.quizStatId === quizStatId);
}

/**
 * This function gets all the attempts of a questionStat
 * @param {number} questionStatId
 * @return {Attempts&{id: number}[]}
 */
function getQuestionStatAttempts(questionStatId) {
    return Attempts.get().filter(attempt => attempt.questionStatId === questionStatId);
}

/*********
 * UTILS *
 *********/

function getRateByFilter(questionsStats, successFilter = question => question.success) {
    return average(questionsStats.map(question => successFilter(question) ? 100 : 0));
}

function getUserQuizzes(userId, questionType, quizId) {
    return buildUserStats(userId).filter(stat => (!quizId || stat.quizId === parseInt(quizId, 10))
        && (!questionType || stat.questionsStats.some(question => isQuestionOfType(question, questionType))));
}

function getAccumulateQuestionStats(userId, quizId, questionType, userQuizzes) {
    return userQuizzes.flatMap(quiz => quiz.questionsStats.filter(question => isQuestionOfType(question, questionType)))
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