import mongoose from "mongoose";

const connectMongo = async () => {
    const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
	throw new Error("MONGO_URI is not defined in environment variables");
  }
  await mongoose.connect(MONGO_URI);
}
export default connectMongo;