const Joi = require('joi');

const {EMAIL_REGEXP} = require('../configs');

const authValidator = Joi.object({
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
});

module.exports = authValidator;
