const {jwtService} = require('../services');
const {ErrorHandler, enumStatus, enumMessage} = require('../errors');
const {User, O_Auth} = require('../db');
const {authValidator} = require('../validators');
const {passwordService} = require('../services');
const {AUTHORIZATION, ACCESS} = require('../configs');

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
                throw new ErrorHandler(enumMessage.BAD_REQUEST, enumStatus.BAD_REQUEST);
            }

            await passwordService.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(enumMessage.UNAUTHORIZED, enumStatus.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, tokenType);

            req.token = token;
            next();
        } catch (e) {
            next(e);
        }
    },

    getTokenResponse: (tokenType) => async (req, res, next) => {
        try {
            const tokenFilter = tokenType === ACCESS ? 'access_token' : 'refresh_token';

            const tokenResponse = await O_Auth.findOne({[tokenFilter]: req.token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(enumMessage.UNAUTHORIZED, enumStatus.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next();
        }
    },
};
