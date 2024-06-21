const Joi = require("joi");
const BaseModel = require("../utils/base-model");

module.exports = new BaseModel("QuizStats", {
    quizId: Joi.string().required().uuid(),
    userId: Joi.string().required().uuid(),
    date: Joi.date().required()
});