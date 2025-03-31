import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js"; 
import movieRoutes from "./src/routes/movieRoutes.js";
import bookmarkRoutes from "./src/routes/bookmarkRoutes.js";
dotenv.config();
const app = express();
// Connect to MongoDB
connectDB()
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tmdb", movieRoutes);
app.use("/api", bookmarkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
