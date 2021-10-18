const {jwtService} = require('../services');
const {ErrorHandler, enumStatus, enumMessage} = require('../errors');
const {User, O_Auth} = require('../db');
const {authValidator} = require('../validators');
const {passwordService} = require('../services');
const {AUTHORIZATION, REFRESH} = require('../configs');

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

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(enumMessage.UNAUTHORIZED, enumStatus.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token);

            req.token = token;
            next();
        } catch (e) {
            next(e);
        }
    },

    getTokenResponse: async (req, res, next) => {
        try {
            const tokenResponse = await O_Auth.findOne({access_token: req.token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(enumMessage.UNAUTHORIZED, enumStatus.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next();
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(enumMessage.UNAUTHORIZED, enumStatus.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, REFRESH);

            const tokenResponse = await O_Auth.findOne({refresh_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(enumMessage.UNAUTHORIZED, enumStatus.UNAUTHORIZED);
            }

            await O_Auth.remove({
                refresh_token: token
            });

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },
};
