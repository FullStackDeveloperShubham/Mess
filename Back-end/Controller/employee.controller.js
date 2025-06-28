import mongoose from "mongoose";
import Employee from "../Model/employe.model.js";

// CREATE new employee
const createEmployee = async (req, res) => {
  const { name, address, number, proofId, monthlyPaid } = req.body;

  try {
    // Validate
    if (!name || !address || !number || !proofId || !monthlyPaid) {
      return res.status(400).json({
        message: "Data is not sufficient",
        success: false,
      });
    }

    // Check if employee already exists
    const existedEmployee = await Employee.findOne({ number });

    if (existedEmployee) {
      return res.status(400).json({
        message: "User already present with this number",
        success: false,
      });
    }

    // Create new employee
    const createNewEmployee = await Employee.create({
      name,
      address,
      number,
      proofId,
      monthlyPaid,
    });

    console.log("Employee created", createNewEmployee);

    return res.status(201).json({
      message: "Employee created successfully",
      success: true,
      employee: createNewEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error.message);
    return res.status(500).json({
      message: "Failed to create employee",
      success: false,
    });
  }
};

// UPDATE employee
const updateEmployee = async (req, res) => {
  const { name, address, number, monthlyPaid } = req.body;
  const { id } = req.params;
  console.log(req.params)

  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const existedEmployee = await Employee.findById({ _id :id});
    console.log(existedEmployee);
    if (!existedEmployee) {
      return res.status(404).json({ message: "Employee does not exist" });
    }

    // Update employee by ID
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, address, number, monthlyPaid },
      { new: true }
    );

    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update the employee",
      success: false,
    });
  }
};

export { createEmployee, updateEmployee };
