import mongoose from "mongoose";

const teacherSubjectSchema = new mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  },
  { timestamps: true }
);

export default mongoose.model("TeacherSubject", teacherSubjectSchema);