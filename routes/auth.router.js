const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

router.post(
    '/',
    authMiddleware.isAuthValid,
    authMiddleware.checkLogin,
    authController.authorizationUser);

module.exports = router;
