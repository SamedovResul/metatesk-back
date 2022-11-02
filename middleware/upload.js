// const path = require('path')
// const multer = require('multer')
import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function(req, file, cb ){
    cb(null, 'uploads')
  },
  filename: function(req, file, cb){
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext )
  }
})

const upload = multer ({
  storage: storage,
  fileFilter: function(req, file, callback){
    if(
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ){
      callback(null, true)
    }else{
      console.log('only jpg & png file supported')
    }
  },
  limits:{
    fileSize: 1199 * 1199 * 6
  }
})




export default  upload
