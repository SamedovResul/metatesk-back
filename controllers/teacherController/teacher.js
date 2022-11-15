import Teacher from '../../models/Teacher.js';
import TimeTableSchema from '../../models/timeTable.js'
import mongoose from 'mongoose';
import {AsyncWrapper} from '../../middleware/AsyncWrapper.js'

// get timetable
export const TimeTable = AsyncWrapper(async(req,res) =>{
  const {id} = req.params
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const timeTable = await TimeTableSchema.find({"date":{"$gte": new Date(`${year}-0${month +1}-${day}`)}, "$and":[{teacher_Id:req.Id }]})
  console.log()
  res.status(200).json(timeTable)
})


// search timetable

export const SearchByTimetable = AsyncWrapper(async (req,res) =>{
  const {startDate, endDate,state} = req.query; 

  const queryObject = {}

  queryObject.teacher_Id = new RegExp(req.Id, "i")

  if(0 === parseInt(state)){
    queryObject.table_State = parseInt(state)
  }else{
    queryObject.table_State = {"$gte": 1,  "$lte": 2}
  }
  

  if(startDate && endDate){
    queryObject.date = {"$gte": new Date(startDate),  "$lte": new Date(endDate)}
  } else if(startDate) {
    queryObject.date = {"$gte": new Date(startDate)}
  } else if(endDate) {
    queryObject.date = {"$lte": new Date(endDate)}
  }
  const timeTable = await TimeTableSchema.find(queryObject)
  console.log(timeTable)
  res.status(201).send(timeTable)
})

// add comment


export const classComment = AsyncWrapper(async(req,res,next) =>{
  // const {id} = req.Id
  const {id, comment} = req.body
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`)
  // console.log(req)
  const addComment = {class_Comment: comment }

  await TimeTableSchema.findByIdAndUpdate(id, addComment,{new:true});
  const table = await TimeTableSchema.findOne({_id:id })
  console.log(table)
  res.json(table)
})