import User from "../Model/users.model.js";

// create new user 
const createUser = async(req,res)=>{
    // get details 
    const {name , email , address , proof} = req.body
    // console.log(name,email,address,proof)

    try {
        // validate user is existe or not 
        // using email
        const userExiste = await User.findOne({email})
        console.log(userExiste)
        if(userExiste){
            return res.status(400).json({message:"User Exist with this email"})
        }

        // create user
        const newUser = await User({
            name,
            email,
            address,
            proof
        })
        console.log(newUser)

        // save into the database
        await newUser.save()

        res.status(200).json({
            message:"User Created Successfully",
            success:true,
            newUser
        })

    } catch (error) {
        return res.status(401).json({
            message:"Error while creating user",
            sucess:false
        })
    }
}

export {
    createUser
}