import mongoose from 'mongoose'

const timeTable = mongoose.Schema({
  student_Name:String,
  student_Id:String,
  teacher_Name: String,
  teacher_Id: String,
  class_Name: String,
  class_Id:String,
  class_Comment:{
    type:String,
    default:"nun"
  },
  table_State:{
    type:Number,
    default:0
  },
  date:Date
})

const TimeTableSchema = mongoose.model("table", timeTable)

export default TimeTableSchema