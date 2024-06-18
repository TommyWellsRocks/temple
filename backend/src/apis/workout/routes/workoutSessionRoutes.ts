import express from "express";

import { authenticateUser } from "../controllers/users/middleware/authenticateUser";
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
	authenticateUser,
	authenticateWorkoutSession,
	fetchWorkoutSession
);

// Create Workout Session
workoutSessionRouter.post("/", authenticateUser, createWorkoutSession);

// Edit Workout Session
workoutSessionRouter.patch("/", authenticateUser, authenticateWorkoutSession, editWorkoutSession);

// Delete Workout Session
workoutSessionRouter.delete("/", authenticateUser, authenticateWorkoutSession, deleteWorkoutSession);
