import User from "../models/User.js";

export const getAllActiveUsers = async () => {
  return await User.find().select("-password_hash");
};

export const deactivateUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.isActive = false;
  await user.save();

  return true;
};

export const activateUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.isActive = true;
  await user.save();

  return true;
};