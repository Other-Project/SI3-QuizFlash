const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("User", {
    id: Joi.string().guid().required(),
    accessRestriction: Joi.string().valid("Guest", "User", "Admin").required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    age: Joi.number().min(0).required(),
    pictureUrl: Joi.string().required()
});
