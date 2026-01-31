import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnect = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/NEWS_APP ",
    );
    console.log("mongoose connected ✅");
  } catch (error) {}
};

export default dbconnect;
