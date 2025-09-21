import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute.js";
import MyRestaurantRoute from "./routes/MyRestaurantRoute.js";
import RestaurantRoute from "./routes/RestaurantRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import { v2 as cloudinary } from "cloudinary";

// Connect to DB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());

app.get("/health", async (req, res) => {
  res.send({ message: "health OK!" });
});

// API Routes
app.use("/api/my/user", MyUserRoute);
app.use("/api/my/restaurant", MyRestaurantRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/order", OrderRoute);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
