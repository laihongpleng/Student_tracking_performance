import {
  getAllActiveUsers,
  deactivateUserById,
  activateUserById,
} from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllActiveUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    await deactivateUserById(req.params.id);
    res.json({ message: "User deactivated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const activateUser = async (req, res) => {
  try {
    await activateUserById(req.params.id);
    res.json({ message: "User activated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};