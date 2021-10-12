const {User} = require('../db');
const {authValidator} = require('../validators');
const {passwordService} = require('../services');

module.exports = {
    isAuthBodyValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = await authValidator.validate({email, password});

            if (error) {
                return next({
                    message: 'Wrong email or password',
                    status: 404,
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    authorizationUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email}).select('+password');
            const hashPassword = user.password;

            if (!user) {
                return next({
                    message: 'Wrong email or password',
                    status: 404,
                });
            }

            await passwordService.compare(password, hashPassword);
            user.password = undefined;

            next();
        } catch (e) {
            next(e);
        }
    }
};
