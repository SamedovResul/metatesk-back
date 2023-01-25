

import mongoose from "mongoose"

const Student = mongoose.Schema({
  name: { 
    type: String, 
    // required:true 
  },
  SecondName:{
    type:String,
    // required:true
  },
  age:{
    type:String,
    // required:true
  },
  ParentName:{
    type:String,
    // required:true
  },
  PhoneNumber:{
    type:Number,
    // required:true
  },
  Email:{
    type:String,
    // required:true
  },
  ClassAmount:{
    type:Number,
    // required:true
  },
  status:{
    type:Number,
    // default:false
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})


const StudentSchema = mongoose.model("student", Student)

export default StudentSchema