import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const loginAdmin = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || user.role !== "admin") {
    throw new Error("Admin not found");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

export const loginUserByUsername = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "admin") {
    throw new Error("Admin must login with email");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};