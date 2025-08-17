import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute.js";

// Connect to DB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database!"));

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/health", async (req, res) => {
  res.send({ message: "health OK!" });
});

// API Routes
app.use("/api/my/user", MyUserRoute);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
