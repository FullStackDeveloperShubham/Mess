import express from "express";
import { createUser, updateUser, deleteUser } from "../Controller/user.controller.js";

const router = express.Router();

// define the all routers
router.post("/add-user", createUser);
router.patch("/update-user/:id",updateUser)
router.delete("/delete-user/:id",deleteUser)

export default router;
