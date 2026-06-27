import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password_hash: String,
    role: { type: String, enum: ["admin", "teacher", "student"] },
    avatar: String,
    cover: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);