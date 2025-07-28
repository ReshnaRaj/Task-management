import mongoose, { Document, Schema, Types } from "mongoose";
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
}
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
export const UserModel = mongoose.model<IUser>("User", userSchema);
