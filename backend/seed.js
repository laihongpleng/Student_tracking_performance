import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import User from "./src/models/User.js";

dotenv.config();

await connectDB();

await User.create({
  username: "admin",
  email: "admin@gmail.com",
  password_hash: "123456",
  role: "admin",
});

console.log("User created!");

process.exit();