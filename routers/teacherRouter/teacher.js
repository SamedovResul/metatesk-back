import express from "express";
import {TimeTable,classComment,SearchByTimetable} from '../../controllers/teacherController/teacher.js';
import Auth from '../../middleware/Auth.js';

const router = express.Router()

router.patch('/:id',Auth,TimeTable)
router.patch('/:id/addComment',Auth, classComment)
router.get('/search',Auth, SearchByTimetable )


export default router