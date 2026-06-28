import { createTeacherService } from "../services/teacher.service.js";

export const createTeacher = async (req, res) => {
  try {
    const result = await createTeacherService(req.body);

    res.status(201).json({
      message: "Teacher created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};