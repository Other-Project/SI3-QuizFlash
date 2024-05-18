const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("User", {
    access: Joi.string().valid("Guest", "User", "Admin").required(),
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    age: Joi.number().positive().required(),
    pictureUrl: Joi.string().base64().required(),

    //Patient attributes
    /* TODO: update hobbies */
    hobbies: Joi.array().items(Joi.string()).when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),
    dementiaLevel: Joi.string().valid("Mild", "Intermediate", "High").when("accessRestriction", {
        is: "User",
        otherwise: Joi.forbidden()
    }),
    fontSize: Joi.number().min(1).max(2).when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),
    removeAnswers: Joi.boolean().when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),
    automatedSkip: Joi.boolean().when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),
    answerHint: Joi.boolean().when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),
    numberOfQuestion: Joi.number().min(1).when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),
    replayAtEnd: Joi.boolean().when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),
    soundQuestion: Joi.boolean().when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),
    autoStartAudio: Joi.boolean().when("accessRestriction", { is: "User", otherwise: Joi.forbidden() }),

    //Admin attribute
    password: Joi.string().when("accessRestriction", { is: "Admin", otherwise: Joi.forbidden() })
});
