import express from "express";
import authRoutes from "./routes/auth.routes.ts";
import dotenv from "dotenv"

export const app = express();

dotenv.config()
app.use(express.json())

app.use('/api', authRoutes);

export default app 