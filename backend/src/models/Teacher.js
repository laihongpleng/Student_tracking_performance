import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    full_name: String,
    gender: String,
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);