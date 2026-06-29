import mongoose from "mongoose";

const teacherAssignmentSchema = new mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

teacherAssignmentSchema.index(
  { teacher_id: 1, subject_id: 1, class_id: 1 },
  { unique: true }
);

export default mongoose.model("TeacherAssignment", teacherAssignmentSchema);