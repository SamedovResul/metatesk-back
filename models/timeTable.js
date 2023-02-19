import mongoose from 'mongoose'

const timeTable = mongoose.Schema({
  StudentsArray:Array,
  teacher_Name: String,
  teacher_Id: String,
  class_Name: String,
  category_name:{
    type:String
  },
  class_Id:String,
  class_Comment:{
    type:String,
    default:" qeyd yoxdur "
  },
  table_State:{
    type:Number,
    default:0
  },
  date:Date
})

const TimeTableSchema = mongoose.model("table", timeTable)

export default TimeTableSchema