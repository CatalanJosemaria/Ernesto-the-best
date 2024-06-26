import { MongoClient } from "mongodb";

// REMEMBER TO CHANGE THIS TO YOUR CONNECTION STRING
const connectionString = "mongodb+srv://amontenegro:austral123@resti.l3gf0kj.mongodb.net/?retryWrites=true&w=majority&appName=resti";

const client = new MongoClient(connectionString);

let conn;
try {
  // Try
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch(e) {
  console.error("Failed to connect to MongoDB", e);
}

let db = conn.db("Austral");

export default db;
