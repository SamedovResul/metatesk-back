import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signUp = async (req,res) =>{
  console.log(req.body)
  try {
    const {name,surname,email,password} = req.body

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userSchema.create({name,surname,email, password: hashedPassword})

    const token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET, {expiresIn:"1h"})

    const data = {
      name:user.name,
      surname:user.surname,
      email:user.email
    }


    res.status(201).json({token})
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const signIn = async (req,res) =>{

  try {
    const {email,password} = req.body
    const user = await userSchema.findOne({email})

    if(!user) return res.status(400).json({ message: 'Invalid email'})

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) res.status(400).json({ message: 'Invalid password'})

    const token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET, {expiresIn:"1h"})

    const data = {
      name:user.name,
      surname:user.surname,
      email:user.email
    }

    res.status(201).json({data,token})
  } catch (error) {
    res.status(500).json(error.message)
  }

}