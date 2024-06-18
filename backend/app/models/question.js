const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");
const { pathPattern } = require("../utils/file");

module.exports = new BaseModel("Question", {
    quizId: Joi.number().required(),
    text: Joi.string().required(),
    type: Joi.string().valid("TextOnly", "Image", "Sound").required(),
    imageUrl: Joi.string().pattern(pathPattern).when("type", { is: "Image", then: Joi.required(), otherwise: Joi.allow("") }),
    soundUrl: Joi.string().pattern(pathPattern).when("type", { is: "Sound", then: Joi.required(), otherwise: Joi.allow("") })
});