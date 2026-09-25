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
  // Never initiate database connection loops during Next.js production build / static generation phase
  if (
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NEXT_PHASE?.includes("build") ||
    process.argv.some((arg) => arg.includes("build"))
  ) {
    return null;
  }

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
      family: 4, // Force IPv4 to prevent IPv6 TLS handshake timeouts
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      bufferCommands: false, // Disable Mongoose buffering so operations fail fast if not connected
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
