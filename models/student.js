import mongoose from "mongoose"

const Student = mongoose.Schema({
  // nameSurname:{
  //   type:String
  // },
  // Country:{
  //   type:String
  // },
  name: { type: String, required:  true },
  secondName:{
    type:String
  },
  age:{
    type:String
  },
  // email:{
  //   type:String
  // },
  // date:{
  //   type:String
  // },
  // time:{
  //   type:String
  // },
  status:{
    type:Boolean,
    default:false
  },
  // whatsAppNumber:{
  //   type:String
  // },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})


const StudentSchema = mongoose.model("student", Student)

export default StudentSchema