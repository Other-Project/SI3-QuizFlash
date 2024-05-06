const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("User", {
    accessRestriction: Joi.string().valid("Guest", "User", "Admin").required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    age: Joi.number().min(0).required(),
    pictureUrl: Joi.string().required(),

    //Patient attributes
    /* TODO: update hobbies */
    hobbies: Joi.array().items(Joi.string()).when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    dementiaLevel: Joi.string().valid("Mild", "Intermediate", "High").when("accessRestriction", {
        is: "User",
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),
    fontSize: Joi.number().min(1).max(2).when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    removeAnswers: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    automatedSkip: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    answerHint: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    numberOfQuestion: Joi.number().min(1).when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    replayAtEnd: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    soundQuestion: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    autoStartAudio: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),

    //Admin attribute
    password: Joi.string().when("accessRestriction", { is: "Admin", then: Joi.required(), otherwise: Joi.forbidden() })
});
