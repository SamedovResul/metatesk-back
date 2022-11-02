import  mongoose from "mongoose";

const userSchema = mongoose.Schema({
  title: String,
  text: String,
  name: String,
  file: Array,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const blogData = mongoose.model('userData', userSchema)

export default blogData