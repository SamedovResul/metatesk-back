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


export const CreateClass = AsyncWrapper(async (req,res) =>{
    const {name,category} = req.body
    let Category = []
    Category.push(category)
    const classes = new Class({
      name,
      class_Category:Category
    })
    await classes.save()
    res.status(201).json(classes)
}  )


export const addCategory = AsyncWrapper(async (req,res) =>{
  const {category} = req.body
  const {id} = req.params
  
  const classCategory = await Class.findById({ _id:id })
  
  const {class_Category} = classCategory
  class_Category.push(category)  
  const newCategory = {class_Category}

  const newClassCategory = await Class.findByIdAndUpdate(id, newCategory,{new:true})

  res.status(201).json(newClassCategory)
}  )

// update

export const UpdateClass = AsyncWrapper(async (req,res,next) =>{
  const {id} = req.params
  let {name,class_Category,category,key} = req.body

  class_Category = class_Category.map((name, index) =>{
    return index === key - 1 ? category : name
  })

  if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`,404));
  const updateClass ={name,class_Category}
  const newClass = await Class.findByIdAndUpdate(id, updateClass,{new:true})
  res.json(newClass)
})


// delete

export const DeleteClass = AsyncWrapper(async (req,res,next) =>{
  const {id}= req.params 

  if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`,404));

    await Class.findByIdAndRemove(id)

    res.json({ message: "Post deleted succesfully" })
})
