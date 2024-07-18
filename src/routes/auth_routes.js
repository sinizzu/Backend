const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const authenticateToken = require('../middlewares/auth_middleware');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;
