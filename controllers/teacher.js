import Teacher  from '../models/Teacher.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import {AsyncWrapper} from '../middleware/AsyncWrapper.js';
import {createCustomError } from '../errors/error.js';
// get
export const getTeacher = AsyncWrapper(async(req,res,next) =>{
  const teacher = await Teacher.find();
  res.status(200).json(teacher);
})


// sign up
const secret = "test"

export const signUpTeacher = AsyncWrapper(async(req,res,next) =>{
  const {name,email,password,status} = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const teacher = await Teacher.create({email,status,  password: hashedPassword, name});

  res.status(200).json(teacher)
})

// update
export const UpdateTeacher = AsyncWrapper(async(req,res,next) =>{
  const {id} =req.params
  const {name,email,password, status} = req.body
  const hashedPassword = await bcrypt.hash(password, 12);
  if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`,404));
  

  const updateTeacher = {name,email,hashedPassword,status,_id:id}

  await Teacher.findByIdAndUpdate(id,updateTeacher, {new:true} )

  res.status(200).json(updateTeacher)
})



