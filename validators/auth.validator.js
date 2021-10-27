const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs');

const passwordValidatorJoi = {
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required(),
};

const authValidator = Joi.object({
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    ...passwordValidatorJoi,
});

const passwordValidator = Joi.object({
    ...passwordValidatorJoi,
});

module.exports = {
    authValidator,
    passwordValidator
};
