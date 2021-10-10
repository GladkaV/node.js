const router = require('express').Router();

const userController = require('../controllers/user');
const userMiddleware = require('../middlewares/user.middleware');

router.get(
    '/',
    userController.getUsers);
router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get(
    '/:user_id',
    userMiddleware.getUserByIdMiddleware,
    userController.getUserById);
router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid,
    userMiddleware.updateUserMiddleware,
    userController.updateUser);
router.delete(
    '/:user_id',
    userController.deleteUser);

module.exports = router;
