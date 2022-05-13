import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.DATABASE_URL;
if (!uri) {
  throw new Error("Missing connection URI for MongoDB.");
}

const client = new MongoClient(uri);
export async function connectToDB() {
  await client.connect();
  return client.db("aymme");
}

export async function disconnectDB() {
  // Ensures that the client will close when you finish/error
  await client.close();
}
