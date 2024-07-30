const { MongoClient } = require('mongodb');
// require('dotenv').config({ path: '../../.env' });

const uri = process.env.MONGO_DB_URL;
const dbName = 'history';

let db;
let indexCreated = false;

async function connectDB() {
    if (db) return db;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);

    // uuid 필드에 고유 인덱스 설정
    if (!indexCreated) {
        await db.collection('s3').createIndex({ uuid: 1 }, { unique: true });
        indexCreated = true;
    }

    return db;
}

// Connect immediately to log the connection status
connectDB()
    .then(() => console.log('Initial connection to the database was successful'))
    .catch((error) => console.error('Initial connection to the database failed', error));

module.exports = connectDB;
