import experss from "express";
import {
  createEmployee,
  updateEmployee,
} from "../Controller/employee.controller.js";

const router = experss.Router();

// create employee
router.post("/create-employee", createEmployee);
router.patch("/update-employee/:id", updateEmployee);

export default router;
