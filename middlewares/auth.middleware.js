const User = require('../db/User');
const authValidator = require('../validators/auth.validator');
const passwordService = require('../services/password.service');

module.exports = {
    isAuthBodyValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = await authValidator.validate({email, password});

            if (error) {
                throw new Error(error.details[0].message);
            }

            const user = await User.findOne({email});

            if (!user) {
                throw new Error('Wrong email or password');
            }

            req.hashPassword = user.password;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    authorizationUserMiddleware: async (req, res, next) => {
        try {
            const hashPassword = req.hashPassword;
            const {password} = req.body;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
