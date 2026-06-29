import User from "../models/User.js";
import Student from "../models/Student.js";
import "../models/Class.js";
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

export const getStudents = async () => {
  const students = await Student.find()
    .populate("user_id", "username email role")
    .populate("class_id");

  return students;
};

export const getStudentById = async (id) => {
    const student = await Student.findById(id)
        .populate("user_id", "username email role")
        .populate("class_id");

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

export const updateStudent = async (id, data) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new Error("Student not found");
  }

  student.full_name = data.full_name ?? student.full_name;
  student.gender = data.gender ?? student.gender;
  student.date_of_birth = data.date_of_birth ?? student.date_of_birth;
  student.class_id = data.class_id ?? student.class_id;

  await student.save();

  if (data.email) {
    const user = await User.findById(student.user_id);

    if (user) {
      user.email = data.email;
      await user.save();
    }
  }

    const updatedStudent = await Student.findById(id)
        .populate("user_id", "username email role")
        .populate("class_id");
    return updatedStudent;
};


