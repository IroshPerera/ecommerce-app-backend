import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import adminAuthRoutes from "./routes/admin/auth.route";
import authRoutes from "./routes/auth.route";
import webAuthRoutes from "./routes/web/auth.route";

import errorHandler from "./middlewares/error.middleware";



dotenv.config();
const app = express();

connectDB();
app.use(express.json());

// Admin Routes
app.use("/api/v1/admin/auth", adminAuthRoutes);

// Web Routes
app.use("/api/v1/web/auth", webAuthRoutes);


// Global Routes
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;
