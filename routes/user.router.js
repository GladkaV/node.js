const router = require('express').Router();

const {userController} = require('../controllers');
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
    authMiddleware.checkAccessToken,
    authMiddleware.getTokenResponse,
    userController.updateUser);
router.delete(
    '/:user_id',
    userMiddleware.isIdValid,
    userMiddleware.checkUser,
    authMiddleware.checkAccessToken,
    authMiddleware.getTokenResponse,
    userController.deleteUser);

module.exports = router;
