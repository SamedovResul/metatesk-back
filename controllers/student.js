import Student from '../models/student.js'
import mongoose from 'mongoose'
import {AsyncWrapper} from '../middleware/AsyncWrapper.js'
import {createCustomError } from '../errors/error.js';
import calendarData from '../models/calendar.js';
// get
export const GetStudent = AsyncWrapper(async (req,res,next) =>{
  

  let queryObject = {}
  const d = new Date()
  

  queryObject.age = new RegExp( d.getMonth().toString().length === 2? `-${d.getMonth() + 1}-`:`-0${d.getMonth() + 1}-`, "i")
  let array = []
  const birthDay = await Student.find(queryObject)

  birthDay.map((day) =>{

    const birthDay = new Date(day.age)
    const d = new Date()
    if(d.getDate() < birthDay.getDate() && d.getDate() + 3 > birthDay.getDate()){
      array.push(day._id)
    }
  })

  const student = await Student.find()
  res.status(201).json({students: student, birthDay:array})
})


// create student

export const CreateStudent = AsyncWrapper( async (req,res) =>{
  const {
    name, 
    SecondName,  
    age, 
    ParentName,
    PhoneNumber,
    Email,
    ClassAmount,
    status,
    dateOne,
    dateTwo,
    timeOne,
    timeTwo,
    teacherName, 
    teacherId,
  } = req.body;
  // console.log(req.body)
    const student = new Student({
      name:name,
      SecondName:SecondName,
      age:age,
      ParentName:ParentName,
      PhoneNumber:PhoneNumber,
      Email:Email,
      ClassAmount:ClassAmount,
      status:status
    })
    const calendarParams = {
      teacherName, 
      teacherId, 
      dateOne, 
      dateTwo,
      studentId:student._id,
      studentName:name,
      timeOne,
      timeTwo,
     }
    await student.save();
    res.status(201).json(student);
})
// update



export const UpdateStudent = AsyncWrapper(async (req,res,next) =>{
  const {id} = req.params;

  const {name,
  SecondName,
  age,
  ParentName,
  PhoneNumber,
  Email,
  ClassAmount,
  status} = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) return next(createCustomError(`No post with id:${id}`,404));

  let updateStudent = {name,
    SecondName,
    age,
    ParentName,
    PhoneNumber,
    Email,
    ClassAmount,
    status, _id:id};

  updateStudent = await Student.findByIdAndUpdate(id,updateStudent, {new:true} );
  console.log(updateStudent)
  res.json(updateStudent);
})


export const fetchByBirthday = AsyncWrapper(async (req,res,next) =>{

  let queryObject = {}
  const d = new Date()
  

  queryObject.age = new RegExp( d.getMonth().toString().length === 2? `-${d.getMonth() + 1}-`:`-0${d.getMonth() + 1}-`, "i")
  let array= []
  const birthDay = await Student.find(queryObject)

  birthDay.map((day) =>{

    const birthDay = new Date(day.age)
    const d = new Date()
    if(d.getDate() < birthDay.getDate() && d.getDate() + 3 > birthDay.getDate()){
      array.push(day._id)
    }
  })

  res.json(array);
})
