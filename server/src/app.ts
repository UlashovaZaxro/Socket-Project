import express from "express";
import authRoutes from "./routes/auth.routes.ts";
import dotenv from "dotenv"
import messageRoutes from "./routes/messages.routes.ts"
import cors from "cors";

export const app = express();

app.use(cors())

dotenv.config()

app.use(express.static('uploads'))
app.use(express.json())
app.use('/api', authRoutes);
app.use('/api/messages', messageRoutes)

export default app 