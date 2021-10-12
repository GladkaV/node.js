const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.get(
    '/',
    userController.getUsers);
router.post(
    '/',
    userMiddleware.createUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get(
    '/:user_id',
    userMiddleware.getUserByIdMiddleware,
    userController.getUserById);
router.put(
    '/:user_id',
    userMiddleware.updateUserBodyValid,
    userMiddleware.updateUserMiddleware,
    userController.updateUser);
router.delete(
    '/:user_id',
    userController.deleteUser);

module.exports = router;
