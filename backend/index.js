import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config.js";
import { dbConnect } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Database Connection
dbConnect();

// API endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
