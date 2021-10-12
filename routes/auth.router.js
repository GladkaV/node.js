const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require("../middlewares");

router.post(
    '/',
    authMiddleware.isAuthBodyValid,
    authMiddleware.authorizationUserMiddleware,
    authController.authorizationUser);

module.exports = router;
