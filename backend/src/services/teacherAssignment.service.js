import TeacherAssignment from "../models/TeacherAssignment.js";
import Teacher from "../models/Teacher.js";
import Subject from "../models/Subject.js";
import Class from "../models/Class.js";

// CREATE ASSIGNMENT
export const createAssignmentService = async (data) => {
  const { teacher_id, subject_id, class_id } = data;

  // validate existence
  const teacher = await Teacher.findById(teacher_id);
  if (!teacher) throw new Error("Teacher not found");

  const subject = await Subject.findById(subject_id);
  if (!subject || !subject.isActive)
    throw new Error("Subject not found or inactive");

  const classData = await Class.findById(class_id);
  if (!classData || !classData.isActive)
    throw new Error("Class not found or inactive");

  const assignment = await TeacherAssignment.create({
    teacher_id,
    subject_id,
    class_id,
  });

  return assignment;
};

// GET ALL
export const getAssignments = async () => {
  return await TeacherAssignment.find()
    .populate("teacher_id", "full_name")
    .populate("subject_id", "subject_name")
    .populate("class_id", "class_name")
    .sort({ createdAt: -1 });
};

// GET ONE
export const getAssignmentById = async (id) => {
  const assignment = await TeacherAssignment.findById(id)
    .populate("teacher_id", "full_name")
    .populate("subject_id", "subject_name")
    .populate("class_id", "class_name");

  if (!assignment) throw new Error("Assignment not found");

  return assignment;
};

// UPDATE
export const updateAssignment = async (id, data) => {
  const assignment = await TeacherAssignment.findById(id);
  if (!assignment) throw new Error("Assignment not found");

  if (data.teacher_id) assignment.teacher_id = data.teacher_id;
  if (data.subject_id) assignment.subject_id = data.subject_id;
  if (data.class_id) assignment.class_id = data.class_id;

  await assignment.save();

  return assignment;
};

// DEACTIVATE
export const deactivateAssignment = async (id) => {
  const assignment = await TeacherAssignment.findById(id);
  if (!assignment) throw new Error("Assignment not found");

  assignment.isActive = false;
  await assignment.save();

  return assignment;
};

export const activateAssignment = async (id) => {
  const assignment = await TeacherAssignment.findById(id);
  if (!assignment) throw new Error("Assignment not found");

  assignment.isActive = true;
  await assignment.save();

  return assignment;
};