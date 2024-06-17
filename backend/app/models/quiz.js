const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");
const { pathPattern } = require("../utils/file");

module.exports = new BaseModel("Quiz", {
    title: Joi.string().required(),
    thumbnailUrl: Joi.string().allow("").pattern(pathPattern),
    tags: Joi.array().items(Joi.string())
});