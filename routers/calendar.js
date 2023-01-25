import  express  from "express";
import Auth from "../middleware/Auth.js";
import { CreateCalendar,getCalendar,UpdateCalendar } from "../controllers/calendar.js";

const router = express.Router();

router.post('/create',Auth, CreateCalendar)
router.get('/:id',Auth, getCalendar);
router.patch('/',Auth, UpdateCalendar)


export default router