import express from "express";

import { authenticateToken } from "../controllers/users/middleware/authenticateToken";
import { authenticateExercise } from "../controllers/exercises/middleware/authenticateExercise";
import { fetchExercise } from "../controllers/exercises/fetchExercise";
import { createExercise } from "../controllers/exercises/createExercise";
import { editExercise } from "../controllers/exercises/editExercise";
import { deleteExercise } from "../controllers/exercises/deleteExercise";

export const exerciseRouter = express.Router();

// * Exercise APIs
// Get Exercise
exerciseRouter.post("/fetch", authenticateToken, authenticateExercise, fetchExercise);

// Create Exercise
exerciseRouter.post("/", authenticateToken, createExercise);

// Edit Exercise
exerciseRouter.patch("/", authenticateToken, authenticateExercise, editExercise);

// Delete Exercise
exerciseRouter.delete("/", authenticateToken, authenticateExercise, deleteExercise);
