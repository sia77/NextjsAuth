import mongoose from "mongoose";

export async function connect() {
  try {
    // Prevent creating multiple connections in dev (Next.js hot reload)
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Already connected to MongoDB");
        return;
    }

    await mongoose.connect(process.env.MONGO_URI!, {
        // Optional but good to add for safety
        dbName: process.env.DB_NAME || undefined,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
        console.log("✅ MongoDB connected successfully");
    });

    connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // <-- You missed the parentheses here
    });
  } catch (error) {
        console.error("Something went wrong connecting to MongoDB:", error);
        process.exit(1);
  }
}