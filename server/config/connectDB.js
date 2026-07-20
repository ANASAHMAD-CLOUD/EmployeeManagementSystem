import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const getMongoUri = () =>
    process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGODB_URL || process.env.MONGO_URL;

export const ConnectDB = async () => {
    const uri = getMongoUri();

    if (!uri) {
        console.error("MongoDB connection string is missing. Set MONGODB_URI in server/.env or your Render environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected...");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}