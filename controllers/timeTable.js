import TimeTable from '../models/timeTable.js';
import Teacher from '../models/Teacher.js'
import Student from '../models/student.js'
import mongoose from 'mongoose';
import {AsyncWrapper} from '../middleware/AsyncWrapper.js';
import {createCustomError } from '../errors/error.js';
import { teacherEmail } from './sendEmail/teacherEmail.js';
// get active timatable

export const getTimetable  = AsyncWrapper(async(req,res,next) =>{
  // const table_State = 0

  // const table = await TimeTable.find({table_State})
    let  tablesArray = await TimeTable.find()
    let finishedClass = []
    let table = []
    tablesArray.map(async (data) =>{
      const {table_State,StudentsArray} = data
      if(table_State === 0){
        table.push(data)
      }
    })
    let student = await Student.find()
    student.map((data) =>{
      const { name,ClassAmount } = data

      if(ClassAmount === 0){
        finishedClass.push(name)
      }
    })

    res.status(200).json({table:table, finishedClass:finishedClass});
})

// get bySearch timetable

export const getTimetableBySearch = AsyncWrapper(async(req,res,next) =>{
  const {startDate, endDate,teacher_Id,student_Name,table_State} = req.query; 
  
  let queryObject = {}
  if(teacher_Id){
    queryObject.teacher_Id = new RegExp(teacher_Id, "i")
  }
  if(student_Name){
    queryObject = { ...queryObject, 'StudentsArray.name': { $regex: new RegExp(student_Name, 'i') } };
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
  

  // calculate salary and confirmed class
  const table = await TimeTable.find(queryObject) || []
  let teacherData
  if(table.length !== 0){
    let  studentCount = table.map((data) => {
      const { StudentsArray,table_State } = data

      if(table_State === 1){
        return StudentsArray.length
      }
    } )

    studentCount =  studentCount.reduce((total, num) =>{
      return total + num;
    })
    const confirmedClass = table?.filter((data) => data.table_State === 1 ) || []
    const cancelClass = table?.filter((data) => data.table_State === 2  ) || []
    let salary 
    if(teacher_Id){
      const teacher = await Teacher.findById({_id:teacher_Id}) 
      salary = teacher.salary * studentCount
    }else{
      salary = 0
    }
    teacherData = {
      confirmedClass:confirmedClass.length,
      cancelClass:cancelClass.length, 
      salary: salary.toFixed(2) 
    }
    res.status(201).json({teacherData:teacherData, table:table})
  }


  
  if(table.length === 0){
    return next(createCustomError(`not any table`, 404));
  }


})

// create timetable for both student and teacher 

export const createTimetable = AsyncWrapper(async(req,res,next) =>{
  let timeTable
  const Array = []
  const ArrayForUser = []
  req.body.map((data) =>{
    const {
          StudentsArray,
          teacher_Name,
          teacher_Id,
          class_Name,
          class_Id,
          date,
          category_name,
        } = data

        StudentsArray.map((data) =>{
          const string = JSON.stringify(data)
          return JSON.parse(string)
        })
        
       timeTable = new TimeTable({
        StudentsArray,
        teacher_Name,
        teacher_Id,
        class_Name,
        category_name,
        class_Id,
        date,
        category_name
      }) 
        Array.push(data)
        ArrayForUser.push(timeTable)
        const saveArray = async() =>{
          await timeTable.save()
        }
        saveArray()
  })

  setTimeout(() => {
    res.status(201).json(ArrayForUser)
    teacherEmail(Array)
  }, 3000);
})


// update timetable 

export const UpdateTimetable = AsyncWrapper(async(req,res,next) =>{
  const {id} = req.params
    const {
      StudentsArray,
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
        StudentsArray,
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

    // decrese class amount
    let tables = await TimeTable.findOne({_id:id})
    const  tablesArray = tables.StudentsArray
    let finishedClass = []

    tablesArray.map(async (data) =>{
    const {student_Id} = data
    
    const student = await Student.findOne({_id:student_Id})
    let {ClassAmount} = student
    if(ClassAmount > 0 && table_State === 1){
      ClassAmount--
    }

      let confirmedClass = {ClassAmount}
      await Student.findByIdAndUpdate(student_Id,confirmedClass, {new:true});
      // console.log(ClassAmount)
      
    })
    

    // confirm table

    setTimeout( async () => {
      let student  = await Student.find()

      student.map((data) =>{
        const { name,ClassAmount } = data
  
        if(ClassAmount === 0){
          finishedClass.push(name)
        }
      })
      const Add_state = {table_State}

      await TimeTable.findByIdAndUpdate(id,Add_state, {new:true});

      const table = await TimeTable.find({table_State:0});

      sendData(table)
    }, 1000);

    


    const sendData = async (table) =>{
      if(table && finishedClass){
        res.status(200).json({table:table, finishedClass:finishedClass});
      }
    }

    
    
})


export const deleteStudentFromTable = AsyncWrapper( async(req,res,next) =>{
  const {id} = req.params
  const { student_Id } = req.body
  let table = await TimeTable.findOne({_id:id}) 

  table.StudentsArray =  table.StudentsArray.filter((data) => data.student_Id !== student_Id)

  await TimeTable.findByIdAndUpdate(id,table, {new:true});

  res.status(200).json(table);
} )


// just push