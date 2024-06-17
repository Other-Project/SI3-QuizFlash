const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("Question", {
    quizId: Joi.number().required(),
    text: Joi.string().required(),
    type: Joi.string().valid("TextOnly", "Image", "Sound").required(),
    imageUrl: Joi.string().uri().when("type", {is: "Image", then: Joi.required(), otherwise: Joi.allow("")}),
    soundUrl: Joi.string().uri().when("type", {is: "Sound", then: Joi.required(), otherwise: Joi.allow("")})
});