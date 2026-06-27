import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subject_name: String,
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);