const router = require('express').Router();

const {authController} = require('../controllers');
const {O_Auth, Action} = require('../db');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {authValidator: {passwordValidator}} = require('../validators');
const {ACCESS, REFRESH, ACCESS_TOKEN, REFRESH_TOKEN, FORGOT_PASSWORD, FORGOT_PASSWORD_TOKEN} = require('../configs');

router.post(
    '/',
    authMiddleware.isAuthValid,
    authMiddleware.checkLogin,
    authController.createToken);

router.post(
    '/refresh',
    authMiddleware.checkToken(REFRESH),
    authMiddleware.getTokenResponse(REFRESH_TOKEN, O_Auth),
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

router.post('/password/forgot', authController.sendMailForgotPassword);
router.put(
    '/password/forgot',
    authMiddleware.checkToken(FORGOT_PASSWORD),
    authMiddleware.getTokenResponse(FORGOT_PASSWORD_TOKEN, Action),
    authController.setNewPasswordAfterForgot);

router.put(
    '/password/:user_id',
    userMiddleware.isIdValid,
    userMiddleware.isBodyValid(passwordValidator),
    userMiddleware.checkUser,
    authMiddleware.checkToken(ACCESS),
    authMiddleware.getTokenResponse(ACCESS_TOKEN, O_Auth),
    authController.changePassword);

module.exports = router;
