const s3Service = require('../services/s3Service');
const historyService = require('../services/historyService');

async function uploadS3(req, res) {
    try {
        const file = req.file; // Multer에 의해 업로드된 파일
        const result = await s3Service.uploadFileToS3(file);
        res.status(200).json({
            message: 'File uploaded successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function saveS3(req, res) {
  try {
      const { uuid, url, email } = req.body;
      console.log(uuid, url, email);
      const result = await historyService.saveS3Info(uuid, url, email);

      res.status(201).json({
          message: 'S3 info saved successfully',
          data: result
      });
  } catch (error) {
      console.error('Error saving S3 info:', error);
      if (error.message.includes('Duplicate entry for uuid')) {
          res.status(409).json({ message: 'UUID already exists' });
      } else {
          res.status(500).json({ message: error.message });
      }
  }
}


async function importS3(req, res) {
  try {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({ message: 'No user email provided' });
    }
      const result = await historyService.getS3InfoByEmail(email);

      res.status(200).json({
          message: 'S3 info retrieved successfully',
          data: result
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}


module.exports = {
  uploadS3,
  saveS3,
  importS3,
};