import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    date: Date,
    status: {
      type: String,
      enum: ["Present", "Absent", "Tardy"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);