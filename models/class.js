import mongoose from "mongoose"

const Class = mongoose.Schema({
  name:String,
  class_Category:{
    type:Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const ClassSchema = mongoose.model("Class", Class)

export default ClassSchema