import Teacher from '../../models/Teacher.js';
import TimeTableSchema from '../../models/timeTable.js'
import mongoose from 'mongoose';
import {AsyncWrapper} from '../../middleware/AsyncWrapper.js'

// get timetable
export const TimeTable = AsyncWrapper(async(req,res,next) =>{
  const {id} = req.params
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const timeTable = await TimeTableSchema.find({"date":{"$gte": new Date(`${year}-0${month +1}-${day}`)}, "$and":[{teacher_Id:id }]})
  console.log(timeTable)
  res.status(200).json(timeTable)
})

// add comment


export const classComment = AsyncWrapper(async(req,res,next) =>{
  const {id} = req.params
  const {class_Comment} = req.body
  console.log(class_Comment)
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`)
  
  const addComment = {class_Comment}

  await TimeTableSchema.findByIdAndUpdate(id, addComment,{new:true});
  const table = await TimeTableSchema.findOne({_id:id })

  res.json(table)
})