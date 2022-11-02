import  mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role:{type:Number, required: true,default:1},
})

const adminData = mongoose.model('adminData', adminSchema)

export default adminData