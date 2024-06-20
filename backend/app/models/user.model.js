const Joi = require("joi");
const AccessRestriction = require("./access-restriction.model");
const DementiaLevel = { "Mild": 0, "Intermediate": 1, "High": 2 };
const BaseModel = require("../utils/base-model.js");
const { pathPattern } = require("../utils/file");

module.exports = new BaseModel("User", {
    access: Joi.number().valid(...Object.values(AccessRestriction)).required(),
    lastname: Joi.string().required().pattern(/^\p{L}+(?:[ -]\p{L}+)*$/u),
    firstname: Joi.string().required().pattern(/^\p{L}+(?:[ -]\p{L}+)*$/u),
    gender: Joi.string().required().valid("M", "F"),
    pictureUrl: Joi.string().allow("").pattern(pathPattern),

    //Patient attributes
    birthDate: Joi.date()
        .required()
        .max(getMaxBirthDate())
        .min(getMinBirthDate())
        .when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    hobbies: Joi.array().items(Joi.string()).when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    dementiaLevel: Joi.number().valid(...Object.values(DementiaLevel))
        .when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    fontSize: Joi.number().min(1).max(2).when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    removeAnswers: Joi.boolean().when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    automatedSkip: Joi.boolean().when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    answerHint: Joi.boolean().when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    numberOfQuestion: Joi.number().min(1).when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    replayAtEnd: Joi.boolean().when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    soundQuestion: Joi.boolean().when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),
    autoStartAudio: Joi.boolean().when("access", { is: AccessRestriction.user, otherwise: Joi.forbidden() }),

    //Admin attribute
    password: Joi.string().when("access", {is: AccessRestriction.admin, then: Joi.required(), otherwise: Joi.forbidden()}),
    salt: Joi.string().when("access", {is: AccessRestriction.admin, then: Joi.required(), otherwise: Joi.forbidden()})
});

function getDateByOffset(offsetYears) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + offsetYears);
    date.setHours(0, 0, 0);
    return date;
}

function getMaxBirthDate() {
    return getDateByOffset(-1);
}

function getMinBirthDate() {
    return getDateByOffset(-200);
}
