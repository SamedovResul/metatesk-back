import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendMail} from '../utils/sendmail.js'
import CryptoJS from 'crypto-js'


export const confirmation = async  (req,res) =>{
  try {
    const {email,userNumber} = req.body
    
    let newUser 

    // user send email
    if(email){
      const number = Math.floor((Math.random() * 1000) + 1000);
      sendMail(email,number)
      console.log(email, 'email')
      newUser = await userSchema.create({confirmationNumber:number,email,confirmationState: false})
      
      res.status(201).json({message:newUser})

      setTimeout( async () => {
        // if user does not confirm email removing from DB
        const user = await userSchema.findOne({_id:newUser._id})
        if(user.confirmationState === false){
          await userSchema.findByIdAndRemove(newUser._id)
        } else{
          console.log('user')
        }
        
      }, 60000);
    }else if(userNumber){
      let confirmNumber = await userSchema.findOne({confirmationNumber:userNumber})

      if(confirmNumber){
        // is user does confirm email keep user in DB
        const Confirm = { confirmationState: true, confirmationNumber:0 }
        let confirm = await userSchema.findByIdAndUpdate(confirmNumber._id, Confirm,{new: true} )
        
        res.status(201).json({message:confirm})
      }else{
        res.status(201).json({message:"wrong password"})
      }
    }
    

    
  } catch (error) {
    res.status(500).json(error.message)
  }
}


export const signUp = async (req,res) =>{
  try {
    const {name,surname,id,password} = req.body
    let user
    // exist user add extra data user name, password, surname etc
    if(name,surname,id,password){
      
      const hashedPassword = await bcrypt.hash(password, 12);
      const data = {name,surname,password:hashedPassword}

      user = await userSchema.findByIdAndUpdate(id, data,{new: true} )
    }else{
      res.status(201).json({message: "you must complete form"})
    }
    
    if(user){
      // created token for user
      const token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET, {expiresIn:"1h"})
      // res.status(201).json(token)
      return  res.status(201).json({token, name: user.name})
    }
    
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const signIn = async (req,res) =>{

  try {
    const {email,password} = req.body
    const user = await userSchema.findOne({email})
    let token 
    let isPasswordCorrect 

    if(user){
      isPasswordCorrect = await bcrypt.compare(password, user.password)
      if(isPasswordCorrect){
        token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET, {expiresIn:"1h"})
        return  res.status(201).json({token, name: user.name})
      }else{
        return res.status(400).json({ message: 'Invalid password'})
      }
    }else{
      return res.status(400).json({ message: 'Invalid email'})
    }

    res.status(201).json({data:"data"})
  } catch (error) {
    res.status(500).json(error.message)
  }

}