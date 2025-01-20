import mongoose from "mongoose";
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("connected!");
  } catch (error) {
    console.log("unable to connect db!", error);
  }
};
export default connectdb;
