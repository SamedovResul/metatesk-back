import mongoose from 'mongoose';
import calendarData from '../models/calendar.js';
import {AsyncWrapper} from '../middleware/AsyncWrapper.js';
import {createCustomError } from '../errors/error.js';

export const getCalendar = AsyncWrapper( async (req,res,next) =>{

  const {id} = req.params

  const calendar = await calendarData.findOne({teacherId:id})
  res.status(201).json(calendar);
} )



export const CreateCalendar = AsyncWrapper( async (req,res,next) =>{
  const  {
    teacher_Id, 
    Monday, 
    Tuesday, 
    Wednesday, 
    Thursday, 
    Friday, 
    Saturday,
    Sunday
   } = req.body
 
   

   const calendar = await calendarData.findOne({teacherId:teacher_Id})

   
   const updateCalendar = {
    Monday: [...calendar.Monday, ...Monday],
    Tuesday: [...calendar.Tuesday, ...Tuesday], 
    Wednesday: [...calendar.Wednesday, ...Wednesday] , 
    Thursday: [...calendar.Thursday, ...Thursday], 
    Friday: [...calendar.Friday, ...Friday], 
    Saturday: [...calendar.Saturday, ...Saturday],
    Sunday: [...calendar.Sunday, ...Sunday],
   }


  const Calendar = await calendarData.findByIdAndUpdate(calendar._id,updateCalendar, {new:true})
  //  console.log(updateCalendar)
  res.status(201).json(Calendar);
})

export const UpdateCalendar = AsyncWrapper( async (req,res) =>{

  const  {
    teacher_Id, 
    Monday, 
    Tuesday, 
    Wednesday, 
    Thursday, 
    Friday, 
    Saturday,
    Sunday
   } = req.body


   const calendar = await calendarData.findOne({teacherId:teacher_Id})

   const updateCalendar = {
    Monday ,
    Tuesday, 
    Wednesday, 
    Thursday, 
    Friday, 
    Saturday,
    Sunday,
   }

   const Calendar = await calendarData.findByIdAndUpdate(calendar._id,updateCalendar, {new:true})

   res.status(201).json(Calendar);

} )