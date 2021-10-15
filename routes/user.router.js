const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');
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
    userMiddleware.checkUser,
    userMiddleware.isBodyValid(updateUserValidator),
    userController.updateUser);
router.delete(
    '/:user_id',
    userMiddleware.isIdValid,
    userMiddleware.checkUser,
    userController.deleteUser);

module.exports = router;
