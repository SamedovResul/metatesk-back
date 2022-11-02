import mongoose from "mongoose"

const Class = mongoose.Schema({
  name:String,
  content:String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const ClassSchema = mongoose.model("Class", Class)

export default ClassSchema