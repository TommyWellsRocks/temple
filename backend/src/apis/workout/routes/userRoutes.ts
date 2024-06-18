import express from "express";

import { authenticateUser } from "../controllers/users/middleware/authenticateUser";
import { fetchUser } from "../controllers/users/fetchUser";
import { createUser } from "../controllers/users/createUser";
import { editUser } from "../controllers/users/editUser";
import { deleteUser } from "../controllers/users/deleteUser";

export const userRouter = express.Router();

// * User APIs
// Login User
userRouter.post("/login", authenticateUser, fetchUser);

// Create User
userRouter.post("/", createUser);

// Edit User
userRouter.patch("/", authenticateUser, editUser);

// Delete User
userRouter.delete("/", authenticateUser, deleteUser);
