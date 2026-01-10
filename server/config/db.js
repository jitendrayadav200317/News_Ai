import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MANGO_DB_URL);
    console.log("mongoose connected ✅");
  } catch (error) {}
};

export default dbconnect;
