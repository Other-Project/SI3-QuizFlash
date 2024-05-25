const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("Quiz", {
    title: Joi.string().required(),
    theme: Joi.string().allow(""),
    thumbnailUrl: Joi.string().allow("").uri(),
    tags: Joi.array().items(Joi.string())
});