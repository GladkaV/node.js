const User = require('../db/User');

module.exports = {
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
    }
};
