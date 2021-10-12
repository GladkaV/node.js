const {User} = require('../db');
const {passwordService} = require('../services');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            newUser.password = undefined;

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser:  (req, res) => {
        try {
            res.json('Successfully updated');
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
};
