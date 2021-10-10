const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs');

const createUserValidator = Joi.object({
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

module.exports = {
    createUserValidator,
};
