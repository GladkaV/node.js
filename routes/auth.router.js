const router = require('express').Router();

const {authController} = require('../controllers');
const {O_Auth, Action} = require('../db');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {ACCESS, REFRESH, REFRESH_TOKEN, FORGOT_PASSWORD, FORGOT_PASSWORD_TOKEN} = require('../configs');
const {authValidator: {emailValidator, authValidator}, userValidator: {forgotPasswordValidator}} = require('../validators');

router.post(
    '/',
    userMiddleware.isBodyValid(authValidator),
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

router.post(
    '/password/forgot',
    userMiddleware.isBodyValid(emailValidator),
    authController.sendMailForgotPassword);
router.put(
    '/password/forgot',
    userMiddleware.isBodyValid(forgotPasswordValidator),
    authMiddleware.checkToken(FORGOT_PASSWORD),
    authMiddleware.getTokenResponse(FORGOT_PASSWORD_TOKEN, Action),
    authController.setNewPasswordAfterForgot);

module.exports = router;
