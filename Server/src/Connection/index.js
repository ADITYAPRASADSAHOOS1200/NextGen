import mongoose from "mongoose";
import 'dotenv/config'


mongoose.set('strictQuery',false)


const connectMongoDb = async (url) => {
  try {
    const connection = await mongoose.connect(url);
    console.log(`Mongoose connected to ${connection.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

export { connectMongoDb };
