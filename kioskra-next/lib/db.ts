import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kioskra";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI is not defined in environment variables. Falling back to local/static data.");
    return null;
  }

  if (cached?.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached?.promise || mongoose.connection.readyState === 0) {
    const opts = {
      dbName: "kioskra",
      serverSelectionTimeoutMS: 2000, // Fail fast after 2s if database server is not reachable
      connectTimeoutMS: 2000,
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected Successfully");
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn("⚠️ MongoDB Connection Error (Falling back to local data):", err.message);
        cached!.promise = null; // Reset promise so subsequent requests can retry
        return null;
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    return null;
  }

  return cached!.conn;
}

export default connectDB;
