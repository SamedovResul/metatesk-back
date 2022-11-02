import express from "express";
import {signUpTeacher, getTeacher,  UpdateTeacher} from "../controllers/teacher.js"
import Auth from "../middleware/Auth.js"

const router = express.Router()


router.post("/register",Auth, signUpTeacher)
router.get("/", Auth, getTeacher)
router.patch("/:id",Auth, UpdateTeacher)
// router.patch("/:id/getStudent",Auth, getStudent)


export default router