import mongoose from "mongoose";

const Teacher = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status:{type:Number, required: true},
  id: { type: String },
  role:{type:Number, required: true, default:0},
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const TeacherScheamas = mongoose.model("Teacher",Teacher)

export default TeacherScheamas