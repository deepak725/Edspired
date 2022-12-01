const express = require('express')
const router = express.Router();
const {CoursevalidateToken,CourseJoinvalidateToken} = require('../Utils/JWT')
const {assignment_controller,assignment_submission_controller,getAllAssignment ,getSingleAssignment} = require("../controllers/Assignment")
// const upload = require('../Utils/')
const upload = require('../Utils/multer')
router.post('/upload',upload.array("pictures", 10),CoursevalidateToken,async(req,res)=>{

    assignment_controller(req,res);


})

router.post('/submit',upload.array("pictures",10),CourseJoinvalidateToken,async(req,res)=>{
    assignment_submission_controller(req,res);
})

router.post('/getAll',async(req,res)=>{
    getAllAssignment(req,res);
})

router.get('/get/:id',async(req,res)=>{
    getSingleAssignment(req,res);
});
module.exports = router;