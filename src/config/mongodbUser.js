const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_DB_URL;
const dbName = 'jwt_auth_proxy';

let db;

async function connectDB() {
    if (db) return db;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);

    return db;
}



module.exports = connectDB;
