import Teacher from '../../models/Teacher.js';
import Timetable from '../../models/timeTable.js'
import mongoose from 'mongoose';
import {AsyncWrapper} from '../../middleware/AsyncWrapper.js'
import calendarData from '../../models/calendar.js';

// get timetable
export const TimeTable = AsyncWrapper(async(req,res) =>{
  const {limit,skip} = req.query;
  const {id} = req.params
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();

  const limitValue = parseInt(limit) || 5;
  const skipValue = (parseInt(skip) - 1) * limit
  const queryObject = {}

  queryObject.table_State = 0
  queryObject.date = {"$gte": new Date(`${year}-${month +1}`),  "$lte": new Date(year, month + 1, 1)}
  queryObject.teacher_Id = req.Id
  const timeTable = await Timetable.find(queryObject).
  limit(parseInt(limitValue)).skip(parseInt(skipValue))

  const countTable = await Timetable.countDocuments({"date":{"$gte": new Date(`${year}-${month +1}`),
  "$lte":new Date(year, month + 1, 1)}, "$and":[{teacher_Id:req.Id }]})

  res.status(200).json({tables:timeTable, count:countTable})
})


export const Calendar = AsyncWrapper(async(req,res) =>{

  const calendar = await calendarData.findOne({teacherId:req.Id})
  res.status(200).json({tables:calendar})
})

// search timetable

export const SearchByTimetable = AsyncWrapper(async (req,res) =>{
  const {startDate, endDate,state,limit,skip} = req.query; 
  const queryObject = {}
  console.log(startDate, endDate)
  queryObject.teacher_Id = new RegExp(req.Id, "i")

  if(0 === parseInt(state)){
    queryObject.table_State = parseInt(state)
  }else{
    queryObject.table_State = {"$gte": 1,  "$lte": 2}
  }
  

  if(startDate && endDate){
    queryObject.date = {"$gte": new Date(startDate),  "$lte": new Date(endDate)}
  }  else if(startDate) {
    queryObject.date = {"$gte": new Date(startDate)}
  } else if(endDate) {
    queryObject.date = {"$lte": new Date(endDate)}
  }
  const limitValue = parseInt(limit) || 5;
  const skipValue = (parseInt(skip) - 1) * limit
  
  const timeTable = await Timetable.find(queryObject)
  .limit(parseInt(limitValue)).skip(parseInt(skipValue))


  const countTable = await Timetable.countDocuments(queryObject)
  console.log(countTable)
  res.status(201).send({tables:timeTable, count:countTable})
})
// add comment


export const classComment = AsyncWrapper(async(req,res,next) =>{
  // const {id} = req.Id
  const {id, comment} = req.body
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`)
  // console.log(req)
  const addComment = {class_Comment: comment }

  await Timetable.findByIdAndUpdate(id, addComment,{new:true});
  const table = await Timetable.findOne({_id:id })
  // console.log(table)
  res.json(table)
})

export const calculate = AsyncWrapper(async(req,res,next) =>{
  const {startDate, endDate,state,limit,skip} = req.query;
  const queryObject = {}
  if(state){
    queryObject.table_State = parseInt(state)
  }
  queryObject.teacher_Id = new RegExp(req.Id, "i")

    
  

  if(startDate && endDate){
    queryObject.date = {"$gte": new Date(startDate),  "$lte": new Date(endDate)}
  } else if(startDate) {
    queryObject.date = {"$gte": startDate}
  } else if(endDate) {
    queryObject.date = {"$lte": endDate}
  }

  const limitValue = parseInt(limit) || 5;
  const skipValue = (parseInt(skip) - 1) * limit
  const countTable = await Timetable.countDocuments(queryObject)

  const timeTable = await Timetable.find(queryObject).
  limit(parseInt(limitValue)).skip(parseInt(skipValue))
  res.json({tables:timeTable, count:countTable})
})