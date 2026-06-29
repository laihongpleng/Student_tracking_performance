import {
  createTeacherService,
  getTeachers,
  getTeacherById,
  updateTeacher,
} from "../services/teacher.service.js";


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

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await getTeachers();

    res.json(teachers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const teacher = await getTeacherById(req.params.id);

    res.json(teacher);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const editTeacher = async (req, res) => {
  try {
    const teacher = await updateTeacher(
      req.params.id,
      req.body
    );

    res.json({
      message: "Teacher updated successfully",
      teacher,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
