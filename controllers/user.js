const User = require('../db/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.json(e.message);
        }

    },

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);
            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.deleteOne({_id: user_id});
            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    authorizationUser: (req, res) => {
        try {
            res.json('Welcome!');
        } catch (e) {
            res.json(e.message);
        }
    },
};
