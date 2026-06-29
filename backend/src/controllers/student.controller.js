
import {
  createStudentService,
  getStudents,
  getStudentById,
  updateStudent,
} from "../services/student.service.js";

export const createStudent = async (req, res) => {
  try {
    const result = await createStudentService(req.body);

    res.status(201).json({
      message: "Student created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await getStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editStudent = async (req, res) => {
  try {
    const student = await updateStudent(req.params.id, req.body);

    res.json({
      message: "Student updated successfully",
      student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
