import { createStudentService } from "../services/student.service.js";

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