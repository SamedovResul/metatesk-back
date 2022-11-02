import blogData from '../models/blogData.js'
import mongoose from 'mongoose';
import fs from 'fs'
import { readdirSync, rename } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import util from 'util'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const getBlog = async (req,res, next) =>{
  
 
  try{
    const blogsData = await blogData.find();
    // console.log(userData)
    res.status(200).json(blogsData)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}


export const createBlog = async (req,res) =>{
  const user = req.body
  console.log(user)
  let files = []

  
  if(req.files){
    req.files.forEach(element => {
      const file = {
        name: element.originalname,
        filepath: element.path,
        fileType: element.mimetype
      }
      files.push(file)
    });
    user.file = files
  }

  const newUser = new blogData(user)
  try{
    await newUser.save()

    res.status(201).json(newUser)
  }catch{
    res.status(409).json({ message: error.message })
  }
}





export const updateBlog = async (req, res) =>{
  const {id} = req.params;
  let update = await blogData.findById(id)
  let files = [] 
  let obg = [] 
  let path = ''
  let imgfiles = []
  let img 


  function imgFiles() {
    req.files.forEach(element => {
      // console.log(element)
      const img = {
        name: element.originalname,
        filepath: element.path,
        fileType: element.mimetype
      }
    imgfiles.push(img) 
    })
  }
  
    if(req.files.length === 2){ 



      for (let i = 0; i < update.file.length; i++) {
        fs.unlinkSync(update.file[i].filepath)
      }
      // console.log(obg)
    }else if(req.files.length === 1) {
      // console.log("test")
      for (let i = 0; i < req.body.file.length; i++) {
        obg.push(JSON.parse(req.body.file[i])) 
      }

      obg.map((img) =>{
        const {filepath} = img
        if(filepath){
          path =  filepath
        }
      })

      img = update.file.filter((img) =>img.filepath !== path)
      imgfiles = update.file.filter((img) =>img.filepath === path)

      img.map((subject) =>{
        const {filepath} = subject
        if(filepath){
          fs.unlinkSync(filepath)  
        }
      })
    }else{
      for (let i = 0; i < req.body.file.length; i++) {
        obg.push(JSON.parse(req.body.file[i])) 
      }
      // console.log(obg)
    }

    

    
  let {file,title, text,name} = req.body
  if(req.files.length >= 1){
      imgFiles()
      file  = imgfiles
    }else{
      file = obg
    }
  // console.log(file)
  
  

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`)

  const updateUser = {  title, text, name, file, _id: id}
  
  await blogData.findByIdAndUpdate(id, updateUser, {new: true})

  // console.log(updateUser)
  
  res.json(updateUser)
}



export const deleteBlog = async (req, res) =>{
  const {id} = req.params;


  

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`)
  


  let array = await blogData.findById(id)


  for (let i = 0; i < array.file.length; i++) {
    fs.unlinkSync(array.file[i].filepath)
  }
  await blogData.findByIdAndRemove(id);

  res.json({ message: "Post deleted succesfully" })
}