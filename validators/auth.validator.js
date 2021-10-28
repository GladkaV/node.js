const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs');

const emailValidatorJoi = {
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
};

const authValidator = Joi.object({
    ...emailValidatorJoi,
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

const emailValidator = Joi.object({
    ...emailValidatorJoi
});

module.exports = {
    authValidator,
    emailValidator
};
