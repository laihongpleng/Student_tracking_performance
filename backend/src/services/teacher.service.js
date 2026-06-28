import User from "../models/User.js";
import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import { generateUsername, generatePassword } from "../utils/credentialGenerator.js";

export const createTeacherService = async (data) => {
  const { full_name, email, gender } = data;

  const username = await generateUsername(full_name);
  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password_hash: hashedPassword,
    role: "teacher",
  });

  const teacher = await Teacher.create({
    user_id: user._id,
    full_name,
    gender,
  });

  return {
    teacher,
    username,
    password,
  };
};