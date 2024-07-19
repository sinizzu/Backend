const connectDB = require('../config/mongodb');

async function getS3Collection() {
    const db = await connectDB();
    return db.collection('s3');
}

async function getChatCollection() {
    const db = await connectDB();
    return db.collection('chat');
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


async function saveChatHistory(uuid, message, sender, email) {
    const chatCollection = await getChatCollection();
    const result = await chatCollection.insertOne({ uuid, message, sender, email, time: new Date() });
    return { _id: result.insertedId, uuid, message, sender, email, time: new Date() };
}


async function getChatHistoryByUUIDAndEmail(uuid, email, sender) {
    const chatCollection = await getChatCollection();
    const query = { uuid, email };
    if (sender) {
        query.sender = sender;
    }
    const result = await chatCollection.find(query).sort({ time: 1 }).toArray();
    return result;
}


module.exports = {
    saveS3Info,
    getS3InfoByEmail,
    saveChatHistory,
    getChatHistoryByUUIDAndEmail
};
