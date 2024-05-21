const Joi = require("joi");
const BaseModel = require("../utils/base-model");

module.exports = new BaseModel("QuestionStats", {
    quizStatId: Joi.number().required(),
    questionId: Joi.number().required(),
    success: Joi.boolean().required()
});