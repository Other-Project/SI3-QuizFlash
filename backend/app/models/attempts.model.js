const Joi = require("joi");
const BaseModel = require("../utils/base-model");

module.exports = new BaseModel("Attempts", {
    questionStatId: Joi.number().required(),
    chosenAnswersId: Joi.number().required(),
    timeSpent: Joi.number().positive().required(),
    answerHint: Joi.boolean().required(),
    hiddenAnswers: Joi.array().items(Joi.number()).required()
});