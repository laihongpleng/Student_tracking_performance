import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import { generateUsername, generatePassword } from "../utils/credentialGenerator.js";

export const createStudentService = async (data) => {
  const { full_name, email, gender, date_of_birth, class_id } = data;
  
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const username = await generateUsername(full_name);
  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password_hash: hashedPassword,
    role: "student",
  });

  const student = await Student.create({
    user_id: user._id,
    full_name,
    gender,
    date_of_birth,
    class_id: class_id || null,
  });

  return {
    student,
    username,
    password,
  };
};