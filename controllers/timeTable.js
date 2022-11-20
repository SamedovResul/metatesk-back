import TimeTable from '../models/timeTable.js';
import mongoose from 'mongoose';
import {AsyncWrapper} from '../middleware/AsyncWrapper.js';
import {createCustomError } from '../errors/error.js';
import { teacherEmail } from './sendEmail/teacherEmail.js';
// get active timatable

export const getTimetable  = AsyncWrapper(async(req,res,next) =>{
  const table_State = 0

  const table = await TimeTable.find({table_State})

  res.status(201).json(table)
})

// get bySearch timetable

export const getTimetableBySearch = AsyncWrapper(async(req,res,next) =>{
  const {startDate, endDate,teacher_Name,student_Name} = req.query; 
  const queryObject = {}
  if(teacher_Name){
    queryObject.teacher_Name = new RegExp(teacher_Name, "i")
  }
  if(student_Name){
    queryObject.student_Name = new RegExp(student_Name, "i")
  }
  if(startDate && endDate){
    queryObject.date = {"$gte": new Date(startDate),  "$lte": new Date(endDate)}
  } else if(startDate) {
    queryObject.date = {"$gte": new Date(startDate)}
  } else if(endDate) {
    queryObject.date = {"$lte": new Date(endDate)}
  }
  const table = await TimeTable.find(queryObject)
  if (!table[0])return next(createCustomError(`not found any table`, 400)); 
  res.status(201).json(table)

})

// create timetable for both student and teacher 

export const createTimetable = AsyncWrapper(async(req,res,next) =>{
  let timeTable
  const Array = []
  req.body.map((data) =>{
    const {
          student_Name,
          student_Id,
          teacher_Name,
          teacher_Id,
          class_Name,
          class_Id,
          date
        } = data
       timeTable = new TimeTable({
        student_Name,
        student_Id,
        teacher_Name,
        teacher_Id,
        class_Name,
        class_Id,
        date
      }) 
        Array.push(data)
        const saveArray = async() =>{
          await timeTable.save()
        }
        saveArray()
  })

  setTimeout(() => {
    res.status(201).json(Array)
    teacherEmail(Array)
  }, 3000);
})



// update timetable 

export const UpdateTimetable = AsyncWrapper(async(req,res,next) =>{
  const {id} = req.params
    const {
      student_Name,
      student_Id,
      teacher_Name,
      teacher_Id,
      class_Name,
      class_Id,
      date
    } = req.body
  
      if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`, 404));
      
      const updateTimetable = {
        student_Name,
        student_Id,
        teacher_Name,
        teacher_Id,
        class_Name,
        class_Id,
        date,
        _id: id
      }
  
      await TimeTable.findByIdAndUpdate(id,updateTimetable, {new:true})
      res.status(200).json(updateTimetable)
})

// confirm timetable 

export const confirm = AsyncWrapper(async(req,res,next) =>{
    const {id} = req.params
    const {table_State} = req.body  

    
    if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`, 404))

    const Add_state = {table_State}

    await TimeTable.findByIdAndUpdate(id,Add_state, {new:true});

    const table = await TimeTable.find({table_State:0});
     res.status(200).json(table);
})


