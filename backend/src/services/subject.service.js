import Subject from "../models/Subject.js";

export const createSubjectService = async (data) => {
  const { subject_name } = data;

  const existingSubject = await Subject.findOne({ subject_name });

  if (existingSubject) {
    throw new Error("Subject already exists");
  }

  const newSubject = await Subject.create({
    subject_name,
  });

  return newSubject;
};

export const getSubjects = async () => {
  return await Subject.find().sort({ subject_name: 1 });
};

export const getSubjectById = async (id) => {
  const subject = await Subject.findById(id);

  if (!subject) {
    throw new Error("Subject not found");
  }

  return subject;
};

export const updateSubject = async (id, data) => {
  const subject = await Subject.findById(id);

  if (!subject) {
    throw new Error("Subject not found");
  }

  subject.subject_name = data.subject_name ?? subject.subject_name;
  subject.isActive = data.isActive ?? subject.isActive;

  await subject.save();

  return subject;
};

export const deactivateSubject = async (id) => {
  const subject = await Subject.findById(id);

  if (!subject) {
    throw new Error("Subject not found");
  }

  subject.isActive = false;

  await subject.save();

  return subject;
};

export const activateSubject = async (id) => {
  const subject = await Subject.findById(id);

  if (!subject) {
    throw new Error("Subject not found");
  }

  subject.isActive = true;

  await subject.save();

  return subject;
};