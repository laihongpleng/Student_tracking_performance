import generateToken from "../utils/generateToken.js";
import { loginAdmin, loginUserByUsername } from "../services/auth.service.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginAdmin(email, password);

    res.json({
      message: "Admin login successful",
      user,
      token: generateToken(user),
    });

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await loginUserByUsername(username, password);

    res.json({
      message: "Login successful",
      user,
      token: generateToken(user),
    });

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};