import express from "express";
import { setAdmin, signin } from "../controllers/admin.js";
import Auth from "../middleware/Auth.js"
// admin route

const router = express.Router()

// router.get("/:id", Auth, getAdmin)
router.post("/signUp", setAdmin)
router.post("/signIn", signin)


export default router