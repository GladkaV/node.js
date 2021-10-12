const {ErrorHandler} = require("../errors");
const {User} = require('../db');
const {userValidator} = require('../validators');
const {userUtil} = require('../util');

module.exports = {
    getUserByIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler('Sorry, there is no such user', 418);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    createUserBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, 418);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler('Email already exist', 418);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    updateUserBodyValid: async (req, res, next) => {
        try {
            const {name} = req.body;
            const {error, value} = await userValidator.updateUserValidator.validate({name});

            if (error) {
                throw new ErrorHandler(error.details[0].message, 418);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    updateUserMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = userUtil.userNormalizator(req.body);

            const updateUser = await User.updateOne({_id: user_id}, {$set: {...user}});

            if (!updateUser) {
                throw new ErrorHandler('Sorry, can`t update', 418);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
