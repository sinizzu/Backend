const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const authenticateToken = require('../middlewares/auth_middleware');
const s3Controller = require('../controllers/s3Controller');
const multer = require('multer');
const upload = multer();
const chatController = require('../controllers/chatController');



router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/uploadS3', upload.single('file'), authenticateToken, s3Controller.uploadS3);
router.post('/saveS3', authenticateToken, s3Controller.saveS3); // 컬렉션 저장
router.get('/importS3', authenticateToken, s3Controller.importS3); // 컬렉션 조회
router.post('/saveChat', authenticateToken, chatController.saveChat); // 컬렉션 저장
router.get('/importChat', authenticateToken, chatController.getChatHistory); // 컬렉션 조회
router.post('/generateS3', authenticateToken, s3Controller.generateS3);
router.post('/deleteS3', authenticateToken, s3Controller.deleteS3);

module.exports = router;
