import  mongoose from "mongoose";

const calendarSchema = mongoose.Schema({
  teacherId:{
    type:String,
  },
  Monday:{
    type:Array,
  },
  Tuesday:{
    type:Array,
  },
  Wednesday:{
    type:Array,
  },
  Thursday:{
    type:Array,
  },
  Friday:{
    type:Array,
  },
  Saturday:{
    type:Array,
  },
  Sunday:{
    type:Array,
  }
})

const calendarData = mongoose.model('calendarData', calendarSchema)

export default calendarData