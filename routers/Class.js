import  express  from "express";
import {CreateClass, UpdateClass, GetClass, DeleteClass} from '../controllers/class.js'
import Auth from "../middleware/Auth.js"


const router = express.Router()

router.get('/', Auth, GetClass)
router.post('/',Auth, CreateClass)
router.patch('/:id',Auth,UpdateClass)
router.delete('/:id', Auth,DeleteClass)

export default router

