import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Connect to the MongoDB database
connectDB();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});