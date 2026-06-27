import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    class_name: String,
  },
  { timestamps: true }
);

export default mongoose.model("Class", classSchema);