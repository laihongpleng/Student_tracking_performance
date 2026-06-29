import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    class_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    academic_year: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Class", classSchema);