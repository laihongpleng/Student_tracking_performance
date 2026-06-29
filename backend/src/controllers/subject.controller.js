import {
  createSubjectService,
  getSubjects,
  getSubjectById,
  updateSubject,
  deactivateSubject,
  activateSubject,
} from "../services/subject.service.js";

export const createSubject = async (req, res) => {
  try {
    const subject = await createSubjectService(req.body);

    res.status(201).json({
      message: "Subject created successfully",
      subject,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await getSubjects();

    res.json(subjects);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getSubject = async (req, res) => {
  try {
    const subject = await getSubjectById(req.params.id);

    res.json(subject);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const editSubject = async (req, res) => {
  try {
    const subject = await updateSubject(req.params.id, req.body);

    res.json({
      message: "Subject updated successfully",
      subject,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const deactivate = async (req, res) => {
  try {
    const subject = await deactivateSubject(req.params.id);

    res.json({
      message: "Subject deactivated successfully",
      subject,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const activate = async (req, res) => {
  try {
    const subject = await activateSubject(req.params.id);

    res.json({
      message: "Subject activated successfully",
      subject,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};