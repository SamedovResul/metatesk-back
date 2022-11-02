import Class from '../models/class.js'
import mongoose from 'mongoose'
import {AsyncWrapper} from '../middleware/AsyncWrapper.js'
import {createCustomError } from '../errors/error.js';
// get

export const GetClass = AsyncWrapper(async (req,res,next)  =>{
  const classes = await Class.find()
  res.status(201).json(classes)
})

// create


export const CreateClass = AsyncWrapper(async (req,res,next) =>{
    
    const classes = new Class(req.body)
    await classes.save()
    res.status(201).json(classes)
}  )


// update

export const UpdateClass = AsyncWrapper(async (req,res,next) =>{
  const {id} = req.params
  const {name, content} = req.body
  if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`,404));
  const updateClass ={name, content, id}
  await Class.findByIdAndUpdate(id, updateClass,{new:true})
  res.json(updateClass)
})


// delete

export const DeleteClass = AsyncWrapper(async (req,res,next) =>{
  const {id}= req.params 

  if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`,404));

    await Class.findByIdAndRemove(id)

    res.json({ message: "Post deleted succesfully" })
})
