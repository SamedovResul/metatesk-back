import express from "express";
import {getBlog, createBlog, updateBlog, deleteBlog} from "../controllers/blog.js"


const router = express.Router()

import upload from '../middleware/upload.js'

// blog route

router.get('/',getBlog )
router.post('/', upload.array('files'), createBlog)
router.patch('/:id', upload.array('files'), updateBlog)
router.delete('/:id', deleteBlog)



export default router;