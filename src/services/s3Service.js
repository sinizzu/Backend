const s3 = require('../config/s3_config');
const uuid = require('uuid');
// require('dotenv').config({ path: '../../.env' });


async function uploadFileToS3(file) {
    try {
        const fileExtension = file.originalname.split('.').pop();
        const uniqueFileName = `${uuid.v4()}.${fileExtension}`;
        const filePath = `${process.env.PREFIX}${uniqueFileName}`;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: file.buffer,
            Key: filePath,
            ContentType: 'application/pdf'
        };

        const upload = s3.upload(params);

        upload.on('httpUploadProgress', (progress) => {
            console.log(`Uploaded ${progress.loaded} of ${progress.total} bytes`);
        });

        const result = await upload.promise();

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;

        return { uuid: uniqueFileName.split('.')[0], file_url: fileUrl, key: filePath };
    } catch (error) {
        if (error.code === 'CredentialsError') {
            throw new Error("AWS credentials not available.");
        } else if (error.code === 'PartialCredentialsError') {
            throw new Error("Incomplete AWS credentials provided.");
        } else {
            throw new Error(error.message);
        }
    }
}


async function uploadFileURLToS3(originalFileName) {
    try {
        const fileExtension = originalFileName.split('.').pop();

        const fileNameWithoutExtension = originalFileName.replace(`.${fileExtension}`, '');
        const uniqueId = uuid.v4();
        const uniqueFileName = `${uniqueId}_${fileNameWithoutExtension}.${fileExtension}`;
        const filePath = `${process.env.PREFIX}${uniqueFileName}`;
        const name = `${uniqueId}_${fileNameWithoutExtension}`;


        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filePath,
            Expires: 60, // URL 유효기간 (초 단위)
            ContentType: 'application/pdf'
        };

        const presignedUrl = await s3.getSignedUrlPromise('putObject', params);

        return { uuid: name, url: presignedUrl, key: filePath };
    } catch (error) {
        if (error.code === 'CredentialsError') {
            throw new Error("AWS credentials not available.");
        } else if (error.code === 'PartialCredentialsError') {
            throw new Error("Incomplete AWS credentials provided.");
        } else {
            throw new Error(error.message);
        }
    }
}

async function deleteFileFromS3(filePath) {
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filePath,
        };

        await s3.deleteObject(params).promise();
        return { message: 'File deleted successfully' };
    } catch (error) {
        if (error.code === 'CredentialsError') {
            throw new Error("AWS credentials not available.");
        } else if (error.code === 'PartialCredentialsError') {
            throw new Error("Incomplete AWS credentials provided.");
        } else {
            throw new Error(error.message);
        }
    }
}


module.exports = {
    uploadFileToS3,
    uploadFileURLToS3,
    deleteFileFromS3
};
