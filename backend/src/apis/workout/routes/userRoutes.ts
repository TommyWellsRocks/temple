import express from "express";

import { authenticateToken } from "../controllers/users/middleware/authenticateToken";
import { loginUser } from "../controllers/users/loginUser";
import { createUser } from "../controllers/users/createUser";
import { editUser } from "../controllers/users/editUser";
import { deleteUser } from "../controllers/users/deleteUser";

export const userRouter = express.Router();

// * User APIs
// Login User
userRouter.post("/login", loginUser);

// Create User
userRouter.post("/", createUser);

// Edit User
userRouter.patch("/", authenticateToken, editUser);

// Delete User
userRouter.delete("/", authenticateToken, deleteUser);
