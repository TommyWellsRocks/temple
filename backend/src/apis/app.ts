import express, { Application } from "express";
import { userRouter } from "./workout/routes/userRoutes";
import { exerciseRouter } from "./workout/routes/exerciseRoutes";
import { workoutSessionRouter } from "./workout/routes/workoutSessionRoutes";
import { env } from "../utils/env";
import cookieParser from "cookie-parser";
env();

// Define API
const PORT = process.env.WORKOUT_API_PORT;
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/workout-sessions", workoutSessionRouter);

// Launch
app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));
