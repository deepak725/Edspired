const express = require('express');
const router = express.Router();
const {CoursevalidateToken,CourseJoinvalidateToken} = require('../Utils/JWT')
const {createCourse,joinCourse} = require('../controllers/Course');

router.post("/create",CoursevalidateToken,async(req,res)=>{

        createCourse(req,res);

})


router.post("/join",CourseJoinvalidateToken,async(req,res)=>{

    joinCourse(req,res);

})
module.exports = router;