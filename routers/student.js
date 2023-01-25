import express from "express";
import { GetStudent,CreateStudent, UpdateStudent,fetchByBirthday } from "../controllers/student.js";
import Auth from "../middleware/Auth.js"


const router = express.Router()

router.get("/",Auth, GetStudent)
router.post("/",Auth, CreateStudent)
router.patch("/:id", Auth, UpdateStudent)
router.get('/birthDay', Auth, fetchByBirthday)

export default router

