const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

router.post(
    '/',
    authMiddleware.isAuthValid,
    authMiddleware.checkLogin,
    authController.createToken);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.createToken);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post(
    '/logoutAll',
    authMiddleware.checkAccessToken,
    authController.logoutAll);

module.exports = router;
