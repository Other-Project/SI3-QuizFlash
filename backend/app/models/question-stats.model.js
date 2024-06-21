const Joi = require("joi");
const BaseModel = require("../utils/base-model");

module.exports = new BaseModel("QuestionStats", {
    quizStatId: Joi.string().required().uuid(),
    questionId: Joi.string().required().uuid(),
    success: Joi.boolean().required()
});