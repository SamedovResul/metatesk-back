import express from "express";
import { GetStudent,CreateStudent, UpdateStudent } from "../controllers/student.js";
import Auth from "../middleware/Auth.js"


const router = express.Router()

router.get("/",Auth, GetStudent)
router.post("/",Auth, CreateStudent)
router.patch("/:id", Auth, UpdateStudent)
// router.post('/timetable', Auth, CreateTimetable

export default router

