import express, { Application } from "express";
import { userRouter } from "./workout/routes/userRoutes";
import { exerciseRouter } from "./workout/routes/exerciseRoutes";
import { workoutSessionRouter } from "./workout/routes/workoutSessionRoutes";

// Define API
const PORT = parseInt(process.argv[2]);
const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/workout-sessions", workoutSessionRouter);

// Launch
app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));