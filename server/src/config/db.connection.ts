import mongoose from "mongoose";
import { env } from "./env.config";

const dbconnection = async () => {
  try {
    mongoose
      .connect(env.MONGODB_URL as string, {})
      .then(() => {
        console.log("Database is connected");
      })
      .catch((err) => {
        console.log("database error", err.message);
      });
  } catch (error) {
    console.log(error,'dataase');
  }
};

export default dbconnection;