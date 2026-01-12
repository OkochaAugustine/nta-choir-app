// app/lib/mongodb.ts
import mongoose, { Mongoose } from "mongoose";
import { MongoClient, MongoClientOptions } from "mongodb";

// Validate environment
if (!process.env.MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

const uri: string = process.env.MONGODB_URI;
const options: MongoClientOptions = {}; // Add options if needed

// ---------- MongoClient (for raw MongoDB) ----------
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// ---------- Mongoose ----------
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use @ts-expect-error instead of any
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

const cached: MongooseCache = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { dbName: "LivingSpringVoices", bufferCommands: false })
      .then((mongooseInstance) => {
        console.log("✅ Mongoose connected successfully");
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  (global as any).mongoose = cached;

  return cached.conn;
}

// ✅ Named exports only
export { clientPromise };
