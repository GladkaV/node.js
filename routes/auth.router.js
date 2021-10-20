const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');
const {ACCESS, REFRESH, REFRESH_TOKEN} = require('../configs');

router.post(
    '/',
    authMiddleware.isAuthValid,
    authMiddleware.checkLogin,
    authController.createToken);

router.post(
    '/refresh',
    authMiddleware.checkToken(REFRESH),
    authMiddleware.getTokenResponse(REFRESH_TOKEN),
    authController.removeToken,
    authController.createToken);

router.post(
    '/logout',
    authMiddleware.checkToken(ACCESS),
    authController.logout);

router.post(
    '/logoutAll',
    authMiddleware.checkToken(ACCESS),
    authController.logoutAll);

router.get(
    '/activate/:token',
    authMiddleware.checkActivateToken,
    authController.activate);

module.exports = router;
