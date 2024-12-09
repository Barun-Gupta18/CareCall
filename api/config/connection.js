// const { MongoClient } = require("mongodb");
// require('dotenv').config();

// const dbURI = process.env.DBURI
// const client = new MongoClient(dbURI);

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// }

// connectToDatabase();

// const dbName = "CareCall"; // Replace with your database name
// let db = client.db(dbName)

// module.exports = db;

const { MongoClient } = require("mongodb");
require('dotenv').config();

const dbURI = process.env.DBURI

let dbInstance;

async function getDB() {
  if (!dbInstance) {
    const client = new MongoClient(dbURI, { useUnifiedTopology: true });
    await client.connect();
    dbInstance = client.db("CareCall");
  }
  return dbInstance;
}

module.exports = getDB;
