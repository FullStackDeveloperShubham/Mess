import express from "express";
import { createUser, updateUser } from "../Controller/user.controller.js";

const router = express.Router();

// define the all routers
router.post("/add-user", createUser);
router.patch("/update-user/:id",updateUser)

export default router;
