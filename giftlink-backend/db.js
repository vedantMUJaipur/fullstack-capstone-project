const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017"; 
const dbName = "giftDB";
let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) return dbInstance;

    const client = new MongoClient(url);
    
    // Strict Task 4 Requirement
    await client.connect(); 
    
    console.log("Connected successfully to MongoDB server");
    dbInstance = client.db(dbName);
    return dbInstance;
}

module.exports = connectToDatabase;