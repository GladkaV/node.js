const router = require('express').Router();

const {ACCESS, ACCESS_TOKEN} = require('../configs');
const {userController} = require('../controllers');
const {O_Auth} = require('../db');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../validators');

router.get(
    '/',
    userController.getUsers);
router.post(
    '/',
    userMiddleware.isBodyValid(createUserValidator),
    userMiddleware.checkEmail,
    userController.createUser);

router.get(
    '/:user_id',
    userMiddleware.isIdValid,
    userMiddleware.checkUser,
    userController.getUserById);
router.put(
    '/:user_id',
    userMiddleware.isIdValid,
    userMiddleware.isBodyValid(updateUserValidator),
    userMiddleware.checkUser,
    authMiddleware.checkToken(ACCESS),
    authMiddleware.getTokenResponse(ACCESS_TOKEN, O_Auth),
    userController.updateUser);
router.delete(
    '/:user_id',
    userMiddleware.isIdValid,
    userMiddleware.checkUser,
    authMiddleware.checkToken(ACCESS),
    authMiddleware.getTokenResponse(ACCESS_TOKEN, O_Auth),
    userController.deleteUser);

module.exports = router;
