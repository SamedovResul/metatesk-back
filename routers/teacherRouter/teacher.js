import express from "express";
import {TimeTable,classComment} from '../../controllers/teacherController/teacher.js';
import Auth from '../../middleware/Auth.js';

const router = express.Router()

router.patch('/:id',TimeTable)
router.patch('/:id/addComment',classComment)

export default router