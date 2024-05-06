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
    hobbies: Joi.array().items(Joi.string()).when("accessRestriction", { is: "User", then: Joi.required() }),
    dementiaLevel: Joi.string().valid("Mild", "Intermediate", "High").when("accessRestriction", { is: "User", then: Joi.required() }),
    fontSize: Joi.number().min(1).max(2).when("accessRestriction", { is: "User", then: Joi.required() }),
    removeAnswers: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required() }),
    automatedSkip: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required() }),
    answerHint: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required() }),
    numberOfQuestion: Joi.number().min(1).when("accessRestriction", { is: "User", then: Joi.required() }),
    replayAtEnd: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required() }),
    soundQuestion: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required() }),
    autoStartAudio: Joi.boolean().when("accessRestriction", { is: "User", then: Joi.required() }),

    //Admin attribute
    password: Joi.string().when("accessRestriction", { is: "Admin", then: Joi.required() })
});
