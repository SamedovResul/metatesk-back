import express from "express";
import {signUpTeacher, getTeacher,  UpdateTeacher,getTeacherData} from "../controllers/teacher.js"
import Auth from "../middleware/Auth.js"

const router = express.Router()


router.post("/register",Auth, signUpTeacher)
router.get("/", Auth, getTeacher)
router.get("/teacherInfo",Auth, getTeacherData)
router.patch("/:id",Auth, UpdateTeacher)



export default router