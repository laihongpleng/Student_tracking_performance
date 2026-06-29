import {
  createClassService,
  getClasses,
  getClassById,
  updateClass,
  deactivateClass,
  activateClass,
} from "../services/class.service.js";

export const createClass = async (req, res) => {
  try {
    const newClass = await createClassService(req.body);

    res.status(201).json({
      message: "Class created successfully",
      class: newClass,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await getClasses();

    res.json(classes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getClass = async (req, res) => {
  try {
    const classData = await getClassById(req.params.id);

    res.json(classData);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const editClass = async (req, res) => {
  try {
    const classData = await updateClass(req.params.id, req.body);

    res.json({
      message: "Class updated successfully",
      class: classData,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const deactivateClassbyID = async (req, res) => {
  try {
    await deactivateClass(req.params.id);
    res.json({
      message: "Class deactivated successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const activateClassByID = async (req, res) => {
  try {
    await activateClass(req.params.id);
      res.json({
          message: "Class activated successfully"
      });
  } catch (err) {
      res.status(500).json({
          message: err.message
      });
  }
};