const User = require('../db/User');

module.exports = {
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

    getUserByIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new Error('Sorry, there is no such user');
            }

            req.user = user;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
