const {jwtService} = require('../services');
const {ErrorHandler, enumStatus, enumMessage} = require('../errors');
const {User} = require('../db');
const {passwordService} = require('../services');
const {AUTHORIZATION} = require('../configs');

module.exports = {
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

    getTokenResponse: (tokenFilter, db) => async (req, res, next) => {
        try {
            const tokenResponse = await db.findOne({[tokenFilter]: req.token});

            if (!tokenResponse) {
                throw new ErrorHandler(enumMessage.UNAUTHORIZED, enumStatus.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;
            req.token_id = tokenResponse._id;
            next();
        } catch (e) {
            next();
        }
    },
};
