const express = require('express')
const router = express.Router();

const upload = require('../Utils/multer')
const {announcementSchema} = require('../DAO/Models/Announcement_model')
const {ProfileValidateToken} =require('../Utils/JWT')
const{ createAnnouncement,getAllAnnouncement,getSingle,createComment,getAllComment} = require('../controllers/Announcement')

router.post('/Create',upload.array("pictures", 10),ProfileValidateToken,async(req,res)=>{
    createAnnouncement(req,res);
})

router.get('/getAll/:courseid',async(req,res)=>{
    getAllAnnouncement(req,res);
})

router.get('/getSingle/:id',async(req,res)=>{
    getSingle(req,res);
})

router.post('/comment/create',ProfileValidateToken,async(req,res)=>{
    createComment(req,res);
})

router.get('/comment/getAll/:id',async(req,res)=>{
    getAllComment(req,res)
})
module.exports = router;