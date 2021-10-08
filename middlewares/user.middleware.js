const User = require('../db/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    authorizationUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email, password});

            if (!user) {
                throw new Error('Wrong email or password');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserByIdMiddleware: (req, res, next) => {
        const {user_id} = req.params;
        User.findById(user_id, err => {
            if (err) {
                return res.json('Sorry, there is no such user');
            }

            next();
        });
    },
};
