const Joi = require("joi");
const BaseModel = require("../utils/base-model");

module.exports = new BaseModel("QuizStats", {
    quizId: Joi.number().required(),
    userId: Joi.number().required(),
    date: Joi.date().required()
});