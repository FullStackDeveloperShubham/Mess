import express from "express";
import { createUser } from "../Controller/user.controller.js";

const router = express.Router();

// define the all routers
router.post("/add-user", createUser);

export default router;
