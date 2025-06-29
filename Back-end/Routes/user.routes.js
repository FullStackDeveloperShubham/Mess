import express from "express";
import { createUser, updateUser, deleteUser , getAllUsers  , getMonthlyPaidByAllUsers} from "../Controller/user.controller.js";

const router = express.Router();

// define the all routers
router.post("/add-user", createUser);
router.patch("/update-user/:id",updateUser)
router.delete("/delete-user/:id",deleteUser)
router.get("/all-users",getAllUsers)
router.get("/get-monthly-paid-by-all-users", getMonthlyPaidByAllUsers); 

export default router;
