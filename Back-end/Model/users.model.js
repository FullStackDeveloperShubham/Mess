import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      require: true,
      lowercase: true,
    },
    proof: {
      type: Number,
      require: true,
      min: 12,
    },
    userMonthlyPaid:{
      type: Number,
      require: true,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
