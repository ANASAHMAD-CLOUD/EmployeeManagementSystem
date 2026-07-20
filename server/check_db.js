import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { HumanResources } from "./models/HR.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

async function run() {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGODB_URL || process.env.MONGO_URL;
    if (!uri) {
      throw new Error("MongoDB connection string is missing. Set MONGODB_URI in server/.env or your Render environment variables.");
    }
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
    const hrs = await HumanResources.find({});
    console.log(`Found HRs count: ${hrs.length}`);
    for (const hr of hrs) {
      console.log({
        email: hr.email,
        isverified: hr.isverified,
        verificationtoken: hr.verificationtoken,
        verificationtokenexpires: hr.verificationtokenexpires,
        now: new Date(),
        isExpired: hr.verificationtokenexpires ? hr.verificationtokenexpires < new Date() : null,
        organizationID: hr.organizationID,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
