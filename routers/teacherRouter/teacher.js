import express from "express";
import {TimeTable,classComment,SearchByTimetable, calculate,Calendar} from '../../controllers/teacherController/teacher.js';
import Auth from '../../middleware/Auth.js';

const router = express.Router()

router.get('/',Auth,TimeTable)
router.put('/addComment',Auth, classComment)
router.get('/search',Auth, SearchByTimetable )
router.get('/calculate',Auth, calculate )
router.get('/calendar',Auth, Calendar)


export default router