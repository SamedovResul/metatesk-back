import TimeTable from '../models/timeTable.js';
import mongoose from 'mongoose';
import {AsyncWrapper} from '../middleware/AsyncWrapper.js';
import {createCustomError } from '../errors/error.js';
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
  const {
        student_Name,
        student_Id,
        teacher_Name,
        teacher_Id,
        class_Name,
        class_Id,
        date
      } = req.body

      const timeTable = new TimeTable({
        student_Name:student_Name,
        student_Id:student_Id,
        teacher_Name:teacher_Name,
        teacher_Id:teacher_Id,
        class_Name:class_Name,
        class_Id:class_Id,
        date:date
      })
        
      await timeTable.save()
  
      res.status(201).json(timeTable)
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


