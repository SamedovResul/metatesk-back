import Teacher  from '../models/Teacher.js';
import calendarData from '../models/calendar.js';
import TimeTableSchema from '../models/timeTable.js'
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


export const getTeacherData = AsyncWrapper (async(req,res) =>{
  const {startDate, endDate,teacherId,student_Name,table_State} = req.query; 
  const queryObject = {}
  if(startDate && endDate){
    queryObject.date = {"$gte": new Date(startDate),  "$lte": new Date(endDate)}
  } else if(startDate) {
    queryObject.date = {"$gte": new Date(startDate)}
  } else if(endDate) {
    queryObject.date = {"$lte": new Date(endDate)}
  }
  const table = await TimeTableSchema.find(queryObject)
  const teacher = await Teacher.findById({_id:teacherId})
  
 
  const confirmedClass = table.filter((data) => data.table_State === 1  )
  const cancelClass = table.filter((data) => data.table_State === 2  )
  const salary = teacher.salary * confirmedClass.length

  res.status(200).json({confirmedClass:confirmedClass.length,cancelClass:cancelClass.length,salary:salary})
})


const createCalendar  = async (teacherName,teacherId)  =>{

  try {
    
    const calendar = new calendarData({
      teacherId, 
      teacherName,
    })


    await calendar.save();
  } catch (error) {
    console.log(error)
  }
}

export const signUpTeacher = AsyncWrapper(async(req,res,next) =>{
  const {name,email,password,status,salary} = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 12);

  const teacher = await Teacher.create({email,status,salary,password: hashedPassword, name});

  createCalendar(name, teacher._id )


  res.status(200).json(teacher)
})




// update
export const UpdateTeacher = AsyncWrapper(async(req,res,next) =>{
  const {id} =req.params
  const {name,email,status,salary} = req.body
  // const hashedPassword = await bcrypt.hash(password, 12);
  if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`,404));
  

  const updateTeacher = {name,email,salary,status,_id:id}

  await Teacher.findByIdAndUpdate(id,updateTeacher, {new:true} )

  res.status(200).json(updateTeacher)
})



