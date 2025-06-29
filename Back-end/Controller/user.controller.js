import User from "../Model/users.model.js";
import mongoose from "mongoose"

// ! CREATE new user
const createUser = async (req, res) => {
  // get details
  const { name, email, address, proof , userMonthlyPaid } = req.body;
  // console.log(name,email,address,proof)

  try {
    // validate user is existe or not
    // using email
    const userExiste = await User.findOne({ email });
    console.log(userExiste);
    if (userExiste) {
      return res.status(400).json({ message: "User Exist with this email" });
    }

    // create user
    const newUser = await User({
      name,
      email,
      address,
      proof,
      userMonthlyPaid, // default value is 0
    });
    console.log(newUser);

    // save into the database
    await newUser.save();

    res.status(200).json({
      message: "User Created Successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Error while creating user",
      sucess: false,
    });
  }
};

// ! UPDATE user
const updateUser = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const { name, email, address, proof ,userMonthlyPaid } = req.body;
  
    // Step 1: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID", success: false });
    }
  
    try {
      // Step 2: Check if user exists
      const existedUser = await User.findById(id);
      if (!existedUser) {
        return res.status(404).json({ message: "User Not Found", success: false });
      }
  
      // Step 3: Update user
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, address, proof,userMonthlyPaid },
        { new: true }
      );
  
      res.status(200).json({ updatedUser, success: true });
    } catch (error) {
      console.error("Update Error:", error.message);
      res.status(500).json({ message: "User Updation failed", success: false });
    }
  };

// ! DELETE user
const deleteUser = async (req,res)=>{
  const {id} = req.params
  try {
    const userWithId = await User.findByIdAndDelete(id)

    // checking 
    if(!userWithId){
      res.status(400).json({
        message:`No user id with with id : ${userWithId}`,
      })
    }

    console.log("user deletion success")
    res.status(200).json({
      message:"User Deletion operation success",
      success:true,
      userWithId
    })
  } catch (error) {
    console.log("Error while deleting user")
    res.status(401).json({
      message:"User deletion operation failed",
      success:false
    })
  }
}

// ! GET all user
const getAllUsers = async (req,res)=>{
  try {
    const users = await User.find().sort({createdAt:-1})
    
    // validation
    if (!users) {
      res.status(400).json({
        message: "Users are not in database",
        success: false,
      });
    }

    // send all users
    res.status(200).json({
      message:"All users",
      success:true,
      users
    })

  } catch (error) {
    res.status(401).json({
      message:"Error while getting all users",
      success:false,
    })
  }
}

// ! Get monthy paid user
const getMonthlyPaidByAllUsers = async(req,res)=>{
  console.log("Get monthly paid by all users")
   try {
      const response = await User.aggregate([
        {
          $group: {
            _id: null,
            totalMonthlyPaid: { $sum: "$userMonthlyPaid" },
          },
        },
      ]);
      const totalMonthlyPaid = response[0].totalMonthlyPaid;
      res.status(200).json({
        message: "Total Monthly Paid by all users",
        success: true,
        totalMonthlyPaid,
      });
   } catch (error) {
      console.error("Error while getting total monthly paid:", error);
      res.status(500).json({
        message: "Error while getting total monthly paid",
        success: false,
      });
   }
}
  

export { createUser, updateUser ,deleteUser, getAllUsers , getMonthlyPaidByAllUsers};
