import mongoose from "mongoose";

const userData = mongoose.Schema({
  name:{
    type:String,
  },
  surname:{
    type:String,
  },
  email:{
    type:String,
  },
  password:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const userDataSchema = mongoose.model("userData", userData)

export default userDataSchema