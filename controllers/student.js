import Student from '../models/student.js'
import mongoose from 'mongoose'
import {AsyncWrapper} from '../middleware/AsyncWrapper.js'
import {createCustomError } from '../errors/error.js';

// get
export const GetStudent = AsyncWrapper(async (req,res,next) =>{
  const student = await Student.find()
  res.status(201).json(student)
})


// create student

export const CreateStudent = AsyncWrapper( async (req,res,next) =>{
  const {firstName, secondName,  age, status} = req.body;
  
    const student = new Student({
      firstName:firstName,
      secondName:secondName,
      age:age,
      status:status
    })

    await student.save();

    res.status(201).json(student);
})


// update

export const UpdateStudent = AsyncWrapper(async (req,res,next) =>{
  const {id} = req.params;

  const {firstName, secondName,  age, status} = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`,404));

  const updateStudent = {firstName, secondName,  age, status, _id:id};

  await Student.findByIdAndUpdate(id,updateStudent, {new:true} );

  res.json(updateStudent);
})