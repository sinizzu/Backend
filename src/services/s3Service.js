const s3 = require('../config/s3_config');
const uuid = require('uuid');
require('dotenv').config();


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

module.exports = {
    uploadFileToS3
};
