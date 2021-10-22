const jwt = require('jsonwebtoken');

const {FORGOT_PASSWORD, JWT_FORGOT_PASSWORD, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS, REFRESH} = require('../configs');
const {ErrorHandler, enumStatus, enumMessage} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            let secret = '';
            switch (tokenType) {
                case ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case FORGOT_PASSWORD:
                    secret = JWT_FORGOT_PASSWORD;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(enumMessage.UNAUTHORIZED, enumStatus.UNAUTHORIZED);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord = '';

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = JWT_FORGOT_PASSWORD;
                break;
            default:
                throw new ErrorHandler(enumMessage.WRONG_TOKEN_TYPE, enumStatus.SERVER_ERROR);
        }

        return jwt.sign({}, secretWord, { expiresIn: '1d' });
    },
};
