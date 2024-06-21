const Joi = require("joi");
const BaseModel = require("../utils/base-model");

module.exports = new BaseModel("Attempts", {
    questionStatId: Joi.string().required().uuid(),
    chosenAnswersId: Joi.string().required().uuid(),
    timeSpent: Joi.number().positive().required(),
    answerHint: Joi.boolean().required(),
    hiddenAnswers: Joi.array().items(Joi.number()).required()
});