const Joi = require("joi");
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("User", {
    access: Joi.string().valid("Guest", "User", "Admin").required(),
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    age: Joi.number().positive().required(),
    pictureUrl: Joi.string().uri().required(),

    //Patient attributes
    hobbies: Joi.array().items(Joi.string()).when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    dementiaLevel: Joi.string().valid("Mild", "Intermediate", "High").when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    fontSize: Joi.number().min(1).max(2).when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    removeAnswers: Joi.boolean().when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    automatedSkip: Joi.boolean().when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    answerHint: Joi.boolean().when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    numberOfQuestion: Joi.number().min(1).when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    replayAtEnd: Joi.boolean().when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    soundQuestion: Joi.boolean().when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),
    autoStartAudio: Joi.boolean().when("access", { is: "User", then: Joi.required(), otherwise: Joi.forbidden() }),

    //Admin attribute
    password: Joi.string().when("access", { is: "Admin", then: Joi.required(), otherwise: Joi.forbidden() })
});
