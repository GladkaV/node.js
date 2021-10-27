const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs');

const nameUserValidatir = {
    name: Joi.string()
        .required()
        .min(3)
        .max(30)
        .trim(),
};

const createUserValidator = Joi.object({
    ...nameUserValidatir,
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

const updateUserValidator = Joi.object({
    ...nameUserValidatir,
});

module.exports = {
    updateUserValidator,
    createUserValidator,
};
