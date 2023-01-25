import  express  from "express";
import {CreateClass, UpdateClass, GetClass, DeleteClass,addCategory} from '../controllers/class.js'
import Auth from "../middleware/Auth.js"


const router = express.Router()

router.get('/', Auth, GetClass)
router.post('/',Auth, CreateClass)
router.patch('/:id',Auth,UpdateClass)
router.patch('/addCategory/:id',Auth,addCategory)
router.delete('/:id', Auth,DeleteClass)
router.delete('/:id', Auth,DeleteClass)

export default router

