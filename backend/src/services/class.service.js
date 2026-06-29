import Class from "../models/Class.js";


export const createClassService = async (data) => {
  const { class_name, academic_year } = data;

  const existingClass = await Class.findOne({ class_name });

  if (existingClass) {
    throw new Error("Class already exists");
  }

  const newClass = await Class.create({
    class_name,
    academic_year,
  });

  return newClass;
};

export const getClasses = async () => {
  return await Class.find().sort({ class_name: 1 });
};

export const getClassById = async (id) => {
  const classData = await Class.findById(id);

  if (!classData) {
    throw new Error("Class not found");
  }

  return classData;
};

export const updateClass = async (id, data) => {
  const classData = await Class.findById(id);

  if (!classData) {
    throw new Error("Class not found");
  }

  classData.class_name = data.class_name ?? classData.class_name;
  classData.academic_year =
    data.academic_year ?? classData.academic_year;

  await classData.save();

  return classData;
};

export const deactivateClass = async (id) => {
  const classData = await Class.findById(id);

  if (!classData) {
    throw new Error("Class not found");
  }

  classData.isActive = false;

  await classData.save();

  return classData;
};

export const activateClass = async (id) => {
  const classData = await Class.findById(id);

  if (!classData) {
    throw new Error("Class not found");
  }

  classData.isActive = true;

  await classData.save();

  return classData;
};