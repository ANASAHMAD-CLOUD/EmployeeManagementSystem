import mongoose from "mongoose";
import dotenv from "dotenv";
import { HumanResources } from "./models/HR.model.js";

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
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
