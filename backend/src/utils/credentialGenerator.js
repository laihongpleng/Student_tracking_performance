import User from "../models/User.js";
import crypto from "crypto";

export const generateUsername = async (fullName) => {
  const base = fullName.toLowerCase().replace(/\s+/g, "_");

  let counter = 1000;
  let username = "";

  while (true) {
    username = `${base}${counter}`;
    const exist = await User.findOne({ username });
    if (!exist) break;
    counter++;
  }

  return username;
};

export const generatePassword = () => {
  return crypto.randomBytes(4).toString("hex");
};