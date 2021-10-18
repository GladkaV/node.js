const {ErrorHandler, enumStatus, enumMessage} = require('../errors');
const {User} = require('../db');
const {authValidator} = require('../validators');
const {passwordService} = require('../services');

module.exports = {
    isAuthValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = await authValidator.validate({email, password});

            if (error) {
                throw new ErrorHandler(enumMessage.BAD_REQUEST, enumStatus.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkLogin: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email}).select('+password');

            if (!user) {
                throw new ErrorHandler(enumMessage.NOT_FOUND, enumStatus.NOT_FOUND);
            }

            await passwordService.compare(password, user.password);

            req.body = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
