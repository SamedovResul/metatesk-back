import mongoose from "mongoose"

const Student = mongoose.Schema({
  firstName:String,
  secondName:String,
  age:Number,
  status:Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})


const StudentSchema = mongoose.model("student", Student)

export default StudentSchema