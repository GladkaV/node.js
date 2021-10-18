const {enumMessage, enumStatus} = require('../errors');
const {O_Auth} = require('../db');
const {jwtService} = require('../services');
const {userUtil: {userNormalizator}} = require('../util');

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

    logout: async (req, res) => {
        try {
            await O_Auth.deleteOne({access_token: req.token});

            res.json(enumMessage.OK, enumStatus.OK);
        } catch (e) {
            res.json(e.message);
        }
    },

    logoutAll: async (req, res) => {
        try {
            const {user_id} = await O_Auth.findOne({access_token: req.token});

            await O_Auth.deleteMany({user_id: user_id.toString()});

            res.json(enumMessage.OK, enumStatus.OK);
        } catch (e) {
            res.json(e.message);
        }
    },
};
