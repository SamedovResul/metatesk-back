import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import adminData from  '../models/adminData.js'
import Teacher  from '../models/Teacher.js'
import {createCustomError } from '../errors/error.js';

const secret = "test"


export const signin = async (req,res,next) =>{
  const {email, password} = req.body
  try {
    const admin = await adminData.findOne({email});
    const teacher = await Teacher.findOne({email});
    let superAdmin 
    if(admin){
      superAdmin = admin
    }else if(teacher) {
      superAdmin = teacher
    }
    if (!superAdmin) return next(createCustomError("Invalid email",400));
    
    const isPasswordCorrect = await bcrypt.compare(password, superAdmin.password)

     if (!isPasswordCorrect) return next(createCustomError("Invalid password",400));


    const token = jwt.sign({email: superAdmin.email, id: superAdmin._id}, secret, {expiresIn: "6h"})

    res.status(200).json({token,superAdmin})

    
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

export const setAdmin = async (req,res) =>{
  const {name,email,password,role} = req.body
  
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await adminData.create({email, password: hashedPassword, name,role});
    const token = jwt.sign({email: admin.email, id: admin._id}, secret, {expiresIn: "1h"});


    res.status(200).json({token, admin})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

