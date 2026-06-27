import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Student Tracking API Running");
});

app.get("/api/test", (_, res) => {
  res.json({ message: "Backend is working" });
});

export default app;