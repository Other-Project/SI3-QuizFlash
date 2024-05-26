const Joi = require("joi");
const AccessRestriction = { "Guest": 0, "User": 1, "Admin": 2 };
const DementiaLevel = { "Mild": 0, "Intermediate": 1, "High": 2 };
const BaseModel = require("../utils/base-model.js");

module.exports = new BaseModel("User", {
    access: Joi.number().valid(Object.values(AccessRestriction)).required(),
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    age: Joi.number().positive().required(),
    pictureUrl: Joi.string().allow("").uri(),

    //Patient attributes
    /* TODO: update hobbies */
    hobbies: Joi.array().items(Joi.string()).when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),
    dementiaLevel: Joi.number().valid(Object.values(DementiaLevel)).when("access", {
        is: AccessRestriction.User,
        otherwise: Joi.forbidden()
    }),
    fontSize: Joi.number().min(1).max(2).when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),
    removeAnswers: Joi.boolean().when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),
    automatedSkip: Joi.boolean().when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),
    answerHint: Joi.boolean().when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),
    numberOfQuestion: Joi.number().min(1).when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),
    replayAtEnd: Joi.boolean().when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),
    soundQuestion: Joi.boolean().when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),
    autoStartAudio: Joi.boolean().when("access", { is: AccessRestriction.User, otherwise: Joi.forbidden() }),

    //Admin attribute
    password: Joi.string().when("access", { is: "Admin", then: Joi.required(), otherwise: Joi.forbidden() })
});
