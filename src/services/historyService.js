// const { connectDB, connectDBUser } = require('../config/mongodb');
const connectDB = require('../config/mongodb');


async function getS3Collection() {
    const db = await connectDB();
    return db.collection('s3');
}

async function getChatCollection() {
    const db = await connectDB();
    return db.collection('chat');
}

// async function getUserCollection() {
//     const db = await connectDBUser();
//     return db.collection('users');
// }



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
    return s3Collection.find({ email }).sort({ uploadedAt: -1 }).toArray();
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


async function deleteS3Info(uuid, email) {
    const s3Collection = await getS3Collection();
    try {
        const result = await s3Collection.deleteOne({ uuid, email });
        if (result.deletedCount === 0) {
            throw new Error('No document found with the provided uuid and email');
        }
        return { message: 'MongoDB record deleted successfully' };
    } catch (error) {
        throw error;
    }
}


// async function getObjectId(email) {
//     const userCollection = await getUserCollection();
//     const user = await userCollection.findOne({ email: email });
//     return user ? user._id.toString() : null; // ObjectId를 문자열로 변환하여 반환
// }


module.exports = {
    saveS3Info,
    getS3InfoByEmail,
    saveChatHistory,
    getChatHistoryByUUIDAndEmail,
    deleteS3Info,
    // getObjectId
};
