import express from "express";

import { authenticateUser } from "../controllers/users/middleware/authenticateUser";
import { authenticateExercise } from "../controllers/exercises/middleware/authenticateExercise";
import { fetchExercise } from "../controllers/exercises/fetchExercise";
import { createExercise } from "../controllers/exercises/createExercise";
import { editExercise } from "../controllers/exercises/editExercise";
import { deleteExercise } from "../controllers/exercises/deleteExercise";

export const exerciseRouter = express.Router();

// * Exercise APIs
// Get Exercise
exerciseRouter.post("/fetch", authenticateUser, authenticateExercise, fetchExercise);

// Create Exercise
exerciseRouter.post("/", authenticateUser, createExercise);

// Edit Exercise
exerciseRouter.patch("/", authenticateUser, authenticateExercise, editExercise);

// Delete Exercise
exerciseRouter.delete("/", authenticateUser, authenticateExercise, deleteExercise);
