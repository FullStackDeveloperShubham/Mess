import User from "../Model/users.model.js";
import mongoose from "mongoose"

// create new user
const createUser = async (req, res) => {
  // get details
  const { name, email, address, proof } = req.body;
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

// update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const { name, email, address, proof } = req.body;
  
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
        { name, email, address, proof },
        { new: true }
      );
  
      res.status(200).json({ updatedUser, success: true });
    } catch (error) {
      console.error("Update Error:", error.message);
      res.status(500).json({ message: "User Updation failed", success: false });
    }
  };

// delete use 
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
  

export { createUser, updateUser ,deleteUser};
