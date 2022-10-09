import mongoose from "mongoose";

const userData = mongoose.Schema({
  name:{
    type:String,
    trim: true,
  },
  surname:{
    type:String,
    trim: true,
  },
  email:{
    type:String,
    required: [true, 'must provide email'],
    trim: true,
  },
  password:{
    type:String,
    trim: true,
  },
  confirmationNumber:{
    type:Number,
    required: [true, 'must provide confirmationNumber'],
    trim: true,
  },
  confirmationState:{
    type:Boolean,
    required: [true, 'must provide confirmationState'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const userDataSchema = mongoose.model("userData", userData)

export default userDataSchema