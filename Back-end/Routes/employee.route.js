import experss from "express";

// ! Controller import
import {
  createEmployee,
  updateEmployee,
  getTotalPayment
} from "../Controller/employee.controller.js";

// ! Express router
const router = experss.Router();

// create employee
router.post("/create-employee", createEmployee);
router.patch("/update-employee/:id", updateEmployee);
router.get("/get-all-employees/monthly-paid", getTotalPayment);

export default router;
