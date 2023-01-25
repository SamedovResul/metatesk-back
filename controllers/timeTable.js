import TimeTable from '../models/timeTable.js';
import Teacher from '../models/Teacher.js'
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
  const {startDate, endDate,teacher_Id,student_Name,table_State} = req.query; 
  const queryObject = {}
  if(teacher_Id){
    queryObject.teacher_Id = new RegExp(teacher_Id, "i")
  }
  if(student_Name){
    queryObject.student_Name = new RegExp(student_Name, "i")
  }
  if(table_State){
    queryObject.table_State = parseInt(table_State)
  }

  
  if(startDate && endDate){
    queryObject.date = {"$gte": new Date(startDate),  "$lte": new Date(endDate)}
  } else if(startDate) {
    queryObject.date = {"$gte": new Date(startDate)}
  } else if(endDate) {
    queryObject.date = {"$lte": new Date(endDate)}
  }

  const table = await TimeTable.find(queryObject) || []
  



  const confirmedClass = table?.filter((data) => data.table_State === 1  ) || []
  const cancelClass = table?.filter((data) => data.table_State === 2  ) || []
  let salary 
  if(teacher_Id){
    const teacher = await Teacher.findById({_id:teacher_Id}) 
    salary = teacher.salary * confirmedClass.length
  }else{
    salary = 0
  }
  const teacherData = {
    confirmedClass:confirmedClass.length,
    cancelClass:cancelClass.length, 
    salary: salary.toFixed(2) 
  }
  
  res.status(201).json({teacherData:teacherData, table:table})

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
          date,
          category_name,
        } = data
       timeTable = new TimeTable({
        student_Name,
        student_Id,
        teacher_Name,
        teacher_Id,
        class_Name,
        category_name,
        class_Id,
        date,
        category_name
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
      date,
      category_name,
      table_State
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
        category_name,
        table_State,
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


