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
  if (cached?.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached?.promise || mongoose.connection.readyState === 0) {
    const opts = {
      dbName: "kioskra",
      serverSelectionTimeoutMS: 5000, // Fail fast after 5 seconds instead of 30 seconds
      connectTimeoutMS: 5000,
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected Successfully");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        cached!.promise = null; // Reset promise so subsequent requests can retry
        throw err;
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
