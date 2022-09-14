import express from "express";
import {signUp,signIn} from '../controller/userAuth.js'

const router = express.Router()

router.post('/Up',signUp )
router.post('/In',signIn )

export default router