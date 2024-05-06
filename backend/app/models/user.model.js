const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("User", {
    id: Joi.string().required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    age: Joi.number().required(),
    pictureUrl: Joi.string().required()
    /* TODO add access restriction */
});
