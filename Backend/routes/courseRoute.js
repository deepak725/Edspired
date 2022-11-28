const express = require('express');
const router = express.Router();
const {CoursevalidateToken,CourseJoinvalidateToken,validateToken} = require('../Utils/JWT')
const {createCourse,joinCourse,getStudentCourse,getInstructorCourse,getSingleCourse} = require('../controllers/Course');

router.post("/create",CoursevalidateToken,async(req,res)=>{

        createCourse(req,res);

})

router.post("/join",CourseJoinvalidateToken,async(req,res)=>{

    joinCourse(req,res);

})

router.post("/getAll/:userid",validateToken,async(req,res)=>{
    getStudentCourse(req,res);
})

router.post("/getAll/created/:userid",validateToken,async(req,res)=>{
    getInstructorCourse(req,res);  
})

router.post("/getCourse",async(req,res)=>{
    getSingleCourse(req,res)
})


module.exports = router;