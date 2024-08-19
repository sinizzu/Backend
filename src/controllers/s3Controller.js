const s3Service = require('../services/s3Service');
const historyService = require('../services/historyService');
// const os = require('os');
const uuid = require('uuid');
const s3 = require('../config/s3_config');

// const calculateCpuUsage = (start, end) => {
//     const startIdle = start.reduce((acc, cpu) => acc + cpu.times.idle, 0);
//     const startTotal = start.reduce((acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);
//     const endIdle = end.reduce((acc, cpu) => acc + cpu.times.idle, 0);
//     const endTotal = end.reduce((acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);

//     const idleDifference = endIdle - startIdle;
//     const totalDifference = endTotal - startTotal;

//     return ((totalDifference - idleDifference) / totalDifference) * 100;
// };

// const calculateMemoryUsage = (start, end) => {
//     return {
//         rss: end.rss - start.rss,
//         heapTotal: end.heapTotal - start.heapTotal,
//         heapUsed: end.heapUsed - start.heapUsed,
//         external: end.external - start.external
//     };
// };

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

async function generateS3(req, res) {
    try {
        const { fileName } = req.body; // 클라이언트로부터 파일 이름을 받아옴
        if (!fileName) {
            return res.status(400).json({ message: 'File name is required' });
        }

        const result = await s3Service.uploadFileURLToS3(fileName);

        return res.status(200).json({
            message: 'Presigned URL generated successfully',
            data: result
        });
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        return res.status(500).json({ message: error.message });
    }
}


async function saveS3(req, res) {
    try {
        const { uuid, email } = req.body;
        const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.PREFIX}${uuid}.pdf`;
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


async function deleteS3(req, res) {
    try {
        const { uuid, email } = req.body;
        const filePath = `${process.env.PREFIX}${uuid}.pdf`;

        // S3에서 파일 삭제
        const check = await s3Service.deleteFileFromS3(filePath);
        console.log(check);

        // MongoDB에서 관련 데이터 삭제
        const result = await historyService.deleteS3Info(uuid, email);

        res.status(200).json({
            message: 'File and MongoDB record deleted successfully',
            data: result
        });
    } catch (error) {
        console.error('Error deleting S3 file and info:', error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    uploadS3,
    saveS3,
    importS3,
    generateS3,
    deleteS3
};