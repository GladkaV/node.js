const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs');

const nameUserValidator = {
    name: Joi.string()
        .required()
        .min(3)
        .max(30)
        .trim(),
};

const passwordValidator = {
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim(),
};

const createUserValidator = Joi.object({
    ...nameUserValidator,
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    ...passwordValidator,
});

const updateUserValidator = Joi.object({
    ...nameUserValidator,
});

const forgotPasswordValidator = Joi.object({
    ...passwordValidator,
});

module.exports = {
    updateUserValidator,
    createUserValidator,
    forgotPasswordValidator,
};
