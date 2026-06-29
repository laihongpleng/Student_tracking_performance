import {
  createAssignmentService,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deactivateAssignment,
  activateAssignment,
} from "../services/teacherAssignment.service.js";

export const createAssignment = async (req, res) => {
  try {
    const assignment = await createAssignmentService(req.body);

    res.status(201).json({
      message: "Teacher assigned successfully",
      assignment,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await getAssignments();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssignment = async (req, res) => {
  try {
    const assignment = await getAssignmentById(req.params.id);
    res.json(assignment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editAssignment = async (req, res) => {
  try {
    const assignment = await updateAssignment(req.params.id, req.body);

    res.json({
      message: "Assignment updated",
      assignment,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const removeAssignment = async (req, res) => {
  try {
    const assignment = await deactivateAssignment(req.params.id);

    res.json({
      message: "Assignment deactivated",
      assignment,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const activateAssignmentById = async (req, res) => {
  try {
    const assignment = await activateAssignment(req.params.id);

    res.json({
      message: "Assignment activated",
      assignment,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};