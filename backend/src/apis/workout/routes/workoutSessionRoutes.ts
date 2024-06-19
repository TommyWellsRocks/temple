import express from "express";

import { authenticateToken } from "../controllers/users/middleware/authenticateToken";
import { authenticateWorkoutSession } from "../controllers/workoutSessions/middleware/authenticateWorkoutSession";
import { fetchWorkoutSession } from "../controllers/workoutSessions/fetchWorkoutSession";
import { createWorkoutSession } from "../controllers/workoutSessions/createWorkoutSession";
import { editWorkoutSession } from "../controllers/workoutSessions/editWorkoutSession";
import { deleteWorkoutSession } from "../controllers/workoutSessions/deleteWorkoutSession";

export const workoutSessionRouter = express.Router();

// * Workout Session APIs
// Get Workout Session
workoutSessionRouter.post(
	"/fetch",
	authenticateToken,
	authenticateWorkoutSession,
	fetchWorkoutSession
);

// Create Workout Session
workoutSessionRouter.post("/", authenticateToken, createWorkoutSession);

// Edit Workout Session
workoutSessionRouter.patch("/", authenticateToken, authenticateWorkoutSession, editWorkoutSession);

// Delete Workout Session
workoutSessionRouter.delete(
	"/",
	authenticateToken,
	authenticateWorkoutSession,
	deleteWorkoutSession
);
