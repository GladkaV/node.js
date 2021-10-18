const {userUtil} = require('../util');
const {enumMessage, enumStatus} = require('../errors');
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

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.find({_id: user_id});

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            let newUser = await User.create({...req.body, password: hashedPassword});

            newUser = userUtil.userNormalizator(newUser.toObject());

            res.status(enumStatus.CREATED).json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser:  async (req, res) => {
        try {
            const {_id} = req.user;
            await User.updateOne({_id: _id.toString()}, {$set: {name: req.body.name}});

            res.status(enumStatus.CREATED).json(enumMessage.UPDATED);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {_id} = req.user;

            await User.deleteOne({_id: _id.toString()});

            res.sendStatus(enumStatus.NO_CONTENT);
        } catch (e) {
            res.json(e.message);
        }
    },
};
