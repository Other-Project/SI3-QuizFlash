const QuizStats = require("./quiz-stats.model");
const QuestionStats = require("./question-stats.model");
const Attempts = require("./attempts.model");
const Quiz = require("./quiz.js");
const Question = require("./question.js");
const Answer = require("./answer.js");
const User = require("./user.model.js");

module.exports = {
    Quiz,
    Question,
    Answer,
    User,
    QuizStats,
    QuestionStats,
    Attempts
};
