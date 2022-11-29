const express = require('express')
const router = express.Router();
const {CoursevalidateToken} = require('../Utils/JWT')
const {assignment_controller,assignment_submission_controller} = require("../controllers/Assignment")
// const upload = require('../Utils/')
const upload = require('../Utils/multer')
router.post('/upload',upload.array("pictures", 10),CoursevalidateToken,async(req,res)=>{

    assignment_controller(req,res);


})

router.post('/submit',upload.array("pictures",10),async(req,res)=>{
    assignment_submission_controller(req,res);
})

module.exports = router;