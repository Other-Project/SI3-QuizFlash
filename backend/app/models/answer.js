const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("Answer", {
    questionId: Joi.string().required().uuid(),
    answerText: Joi.string().required(),
    trueAnswer: Joi.boolean().required()
});
