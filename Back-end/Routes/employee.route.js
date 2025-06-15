import experss from "express"
import createEmployee from "../Controller/employee.controller.js"

const router = experss.Router()


// create employee
router.post("/create-employee",createEmployee)

export default router