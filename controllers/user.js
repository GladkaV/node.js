const {CREATE, UPDATE, DELETE} = require('../configs');
const {O_Auth, User} = require('../db');
const {enumMessage, enumStatus} = require('../errors');
const {emailService, passwordService, userService, s3Service} = require('../services');
const {userUtil} = require('../util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers(req.query);

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
            const {name: userName} = req.body;

            let newUser = await User.create({...req.body, password: hashedPassword});

            await emailService.sendMail(req.body.email, CREATE, {userName});

            newUser = userUtil.userNormalizator(newUser.toObject());

            res.status(enumStatus.CREATED).json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createAvatar: async (req, res) => {
        try {
            let newUser = {};

            if (req.files && req.files.avatar) {
                const uploadInfo = await s3Service.uploadImage(req.files.avatar, 'users', req.params.user_id.toString());

                newUser = await User.findByIdAndUpdate(req.params.user_id, {avatar: uploadInfo.Location}, {new: true});
            }

            res.status(enumStatus.CREATED).json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser:  async (req, res) => {
        try {
            const {_id, name: userName, email} = req.user;

            await User.updateOne({_id: _id.toString()}, {$set: {name: req.body.name}});

            await emailService.sendMail(email, UPDATE, {userName});

            res.status(enumStatus.CREATED).json(enumMessage.UPDATED);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {_id, name: userName, email} = req.user;

            await User.deleteOne({_id: _id.toString()});

            await O_Auth.deleteMany({user_id: _id});

            await emailService.sendMail(email, DELETE, {userName});

            res.sendStatus(enumStatus.NO_CONTENT);
        } catch (e) {
            res.json(e.message);
        }
    },
};
