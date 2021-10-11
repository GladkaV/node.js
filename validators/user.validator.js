const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs');

const createUserValidator = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(30)
        .trim(),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

const updateUserValidator = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(30)
        .trim(),
});

module.exports = {
    updateUserValidator,
    createUserValidator,
};
