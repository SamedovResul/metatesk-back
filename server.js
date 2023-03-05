import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import hbs from 'hbs'
import blogRouter from './routers/blogRouter.js'
import adminRouter from './routers/adminRouter.js'
import student from './routers/student.js';
import teachers from './routers/teacher.js';
import classes  from './routers/Class.js';
import timeTable from './routers/timeTable.js';
import Teacher from './routers/teacherRouter/teacher.js';
import Email from './routers/email/email.js'
import calendar from './routers/calendar.js'
import {errorHandlerMiddleware} from './middleware/error-handler.js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
dotenv.config();

app.use(cors())



app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// handle Bars

app.get('/index', (req,res) =>{
  res.render( 'index', {
    title:"login",
  })
})


app.get("/get", (req,res) =>{
  res.json("hello world")
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/blogs', blogRouter)
app.use('/admin', adminRouter)
app.use('/teachers', teachers)
app.use('/class', classes)
app.use('/student', student)
app.use('/timeTable', timeTable)
app.use('/teacher', Teacher)
app.use('/email' , Email)
app.use('/calendar', calendar)
app.use(errorHandlerMiddleware);
app.get('/', (req,res) =>{
  res.send("hello world")
})




const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen((PORT), () => console.log(`server running on Port:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))


