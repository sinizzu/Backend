const connectDB = require('../config/mongodb');

async function getS3Collection() {
    const db = await connectDB();
    return db.collection('s3');
}



async function saveS3Info(uuid, url, email) {
    const s3Collection = await getS3Collection();
    try {
        const result = await s3Collection.insertOne({ uuid, url, email, uploadedAt: new Date() });
        return { _id: result.insertedId, uuid, url, email, uploadedAt: new Date() };
    } catch (error) {
        if (error.code === 11000) { // 중복 키 오류 코드
            throw new Error('Duplicate entry for uuid');
        }
        throw error;
    }
}

async function getS3InfoByEmail(email) {
    const s3Collection = await getS3Collection();
    return s3Collection.find({ email }).toArray();
}

module.exports = {
    saveS3Info,
    getS3InfoByEmail,
};
