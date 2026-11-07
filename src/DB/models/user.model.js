import mongoose from "mongoose";
import { GenderEnum } from "../../common/enum/user.enum.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Email already exists."],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
  },
  {
    // timestamps: true,
    strict: true, //by default,
    autoIndex: true,
    strictQuery: true,
    // toObject: { virtuals: true },
    // toJSON: { virtuals: true },
    optimisticConcurrency: true,
  },
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
