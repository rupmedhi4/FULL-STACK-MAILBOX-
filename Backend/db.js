import mongoose from "mongoose";
import dotenv  from 'dotenv';


dotenv.config(); 


const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export { connectDB }
