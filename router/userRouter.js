import express from "express";
import {signUp,signIn,confirmation} from '../controller/userAuth.js'

const router = express.Router()

router.post('/confirmation',confirmation )
router.post('/Up',signUp )
router.post('/In',signIn )

export default router