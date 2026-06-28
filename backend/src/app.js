import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import studentRoutes from "./routes/student.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Student Tracking API Running");
});

app.get("/api/test", (_, res) => {
  res.json({ message: "Backend is working" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);

export default app;