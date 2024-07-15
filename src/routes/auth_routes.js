const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const authenticateToken = require('../middlewares/auth_middleware');


router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
