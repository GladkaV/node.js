const router = require('express').Router();

const authController = require('../controllers/auth');
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/', authMiddleware.authorizationUserMiddleware, authController.authorizationUser);

module.exports = router;