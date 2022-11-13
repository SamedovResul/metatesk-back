import express from "express";
import { 
  getTimetable, 
  createTimetable,
  UpdateTimetable,
  getTimetableBySearch,
  confirm 
} from "../controllers/timeTable.js";
import Auth from '../middleware/Auth.js'

const router = express.Router()

router.get('/',Auth, getTimetable);
router.post('/',Auth,createTimetable);
router.patch('/:id',Auth,UpdateTimetable);
router.patch('/state/:id', Auth,confirm);
router.get('/search',Auth,  getTimetableBySearch);



export default router