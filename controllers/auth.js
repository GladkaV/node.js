const {FORGOT_PASSWORD, FORGOT_PASSWORD_EMAIL, frontUrl} = require('../configs');
const {ErrorHandler, enumStatus, enumMessage} = require('../errors');
const {Action, O_Auth, User} = require('../db');
const {jwtService, emailService, passwordService} = require('../services');
const {userUtil: {userNormalizator}} = require('../util');
const {authValidator: {emailValidator}} = require('../validators');

module.exports = {
    createToken: async (req, res) => {
        try {
            let {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            user = userNormalizator(user.toObject());

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id,
            });

            res.json({
                user,
                ...tokenPair,
            });
        } catch (e) {
            res.json(e.message);
        }
    },

    removeToken: async (req, res, next) => {
        try {
            const {token} = req;

            await O_Auth.remove({refresh_token: token});

            next();
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res) => {
        try {
            await O_Auth.deleteOne({access_token: req.token});

            res.json(enumMessage.OK);
        } catch (e) {
            res.json(e.message);
        }
    },

    logoutAll: async (req, res) => {
        try {
            const {user_id} = await O_Auth.findOne({access_token: req.token});

            await O_Auth.deleteMany({user_id: user_id.toString()});

            res.json(enumMessage.OK);
        } catch (e) {
            res.json(e.message);
        }
    },

    sendMailForgotPassword: async (req, res) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler(enumMessage.NOT_FOUND, enumStatus.NOT_FOUND);
            }

            const actionToken = jwtService.generateActionToken(FORGOT_PASSWORD);

            await Action.create({
                token: actionToken,
                token_type: FORGOT_PASSWORD,
                user_id: user._id,
            });

            await emailService.sendMail(
                email,
                FORGOT_PASSWORD_EMAIL,
                {forgotPasswordUrl: `${frontUrl}/passwordForgot?token=${actionToken}`
                });

            res.json(enumMessage.OK);
        } catch (e) {
            res.json(e.message);
        }
    },

    setNewPasswordAfterForgot: async (req, res) => {
        try {
            await Action.deleteOne({_id: req.token_id});

            const hashedPassword = await passwordService.hash(req.body.password);
            const {_id} = req.user;

            await User.updateOne({_id: _id.toString()}, {$set: {password: hashedPassword}});

            await O_Auth.deleteMany({user_id: _id});

            res.json(enumMessage.OK);
        } catch (e) {
            res.json(e.message);
        }
    },
};
