import express from "express";
import {sendMail} from "../../controllers/sendEmail/email.js"

const router = express.Router()


router.post('/post', sendMail);


export default router