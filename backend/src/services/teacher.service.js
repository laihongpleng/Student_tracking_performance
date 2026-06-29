import User from "../models/User.js";
import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import { generateUsername, generatePassword } from "../utils/credentialGenerator.js";

export const createTeacherService = async (data) => {
  const { full_name, email, gender } = data;
  
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

export const getTeachers = async () => {
  const teachers = await Teacher.find().populate(
    "user_id",
    "username email role"
  );

  return teachers;
};

export const getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id).populate(
    "user_id",
    "username email role"
  );

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  return teacher;
};

export const updateTeacher = async (id, data) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  if (data.full_name) {
    teacher.full_name = data.full_name;
  }

  if (data.gender) {
    teacher.gender = data.gender;
  }

  await teacher.save();

  if (data.email) {
    const user = await User.findById(teacher.user_id);

    if (user) {
      user.email = data.email;
      await user.save();
    }
  }

  const updatedTeacher = await Teacher.findById(id).populate(
    "user_id",
    "username email role"
  );

  return updatedTeacher;
};


