const User = require('../db/User');
const userValidator = require('../validators/user.validator');
const userUtil = require('../util/user.util');

module.exports = {
    getUserByIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            let user = await User.findById(user_id).lean();

            if (!user) {
                throw new Error('Sorry, there is no such user');
            }

            user = userUtil.userNormalozator(user);

            req.user = user;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = userUtil.userNormalozator(req.body);

            const updateUser = await User.updateOne({_id: user_id}).set({...user});

            if (!updateUser) {
                throw new Error('Sorry, can`t update');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
