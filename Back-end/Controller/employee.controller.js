import Employee from "../Model/employe.model.js"

// Create new employee
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


export default createEmployee