import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    score: Number,
    exam_type: {
      type: String,
      enum: ["Quiz", "Midterm", "Final"],
    },
    date: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Score", scoreSchema);