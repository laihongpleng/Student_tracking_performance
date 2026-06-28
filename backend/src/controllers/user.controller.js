import User from "../models/User.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password_hash");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "student") {
      await Student.deleteOne({ user_id: user._id });
    }

    if (user.role === "teacher") {
      await Teacher.deleteOne({ user_id: user._id });
    }

    await User.findByIdAndDelete(user._id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
