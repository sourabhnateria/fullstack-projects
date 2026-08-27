require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected");
    await client.close();
  } catch (e) {
    console.error(e);
  }
}

run();
