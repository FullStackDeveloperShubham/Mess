import mongoose , {Schema} from "mongoose"

const employeeSchema = new Schema({
    name:{
        type:String,
        require:true,
        lowercase:true
    },
    address:{
        type:String,
        require:true,
        lowercase:true
    },
    number:{
        type:Number,
        require:true
    },
    proofId : {
        type:Number,
        require:true,
    },
    monthlyPaid:{
        type:Number,
        require:true
    }
},{
    timestamps:true
})

const Employee = mongoose.models.employees || mongoose.model("employee",employeeSchema)

export default Employee