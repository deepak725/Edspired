const responses = require("../Utils/responses");
const course = require("../DAO/Models/course_model");
const course_register = require("../DAO/Models/course_register");
// const users = require("../DAO/Models/user_model");
const mongoose = require('mongoose');
const {idExist} = require('../DAO/Access/User')
const {course_create} = require('../DAO/Access/Course_crud');
// const { response } = require("express");
// const { response } = require("express");
// const mongoose = require('mongoose')

const createCourse = async (req, res) => {
  try {
    if (!req.body.courseName) {
      return responses.badRequestResponse(
        res,
        {},
        "Please provide courseName in body section!"
      );
    }
    var minm = 10000;
    var maxm = 99999;
    let found = false;
    while (!found) {
      var code = Math.floor(Math.random() * (maxm - minm + 2)) + minm;
      const val = await course.findOne({ course_code: code });
      if (!val) found = true;

    }

    //Database code

    const instructor = await idExist(req,req.body.instructor_id);
    

    if(!instructor)
        return responses.badRequestResponse(res,{},"Your user id not found in system!");
     
    if(!instructor.verified)    
        return responses.badRequestResponse(res,{},"Your email is not verified in system. please verify it in profile section!");
    
        //db code

    course_create(req,res,code);

  } catch (err) {
    return responses.badRequestResponse(res, err,"Internal error");
  }
};

const joinCourse = async(req,res) => {

    try{
        if(!req.body.courseCode)
        {
            return responses.badRequestResponse(res,{},"Course code not provided");
        }

        //db One
        const course_find = await course.findOne({ course_code: req.body.courseCode});
        if(!course_find)
            return responses.badRequestResponse(res,{},"Course not found! please check the course code.");
        

        let course_id = course_find._id;    
        let inst_id = course_find.instructor_id;
        console.log(course_id);
        // console.log(course_find);
        //db code
        var stu = await course_register.findOne({course_id:course_id })
        var ids = req.body.student_id;
        console.log(stu)
        if(inst_id.toString() === ids.toString())
        {
            return responses.badRequestResponse(res,{},"Instructor can't Join its own class!");
        }
        if(stu)
        {
          console.log("inside if")
            var ids2 = stu.student_id;
            var error =  ids2.every(ele => {
               if(ele.toString() === ids.toString())
                {
                    console.log("in every")
                    return true;
                }
          })
        
          console.log("ended")
            if(error){
                return responses.badRequestResponse(res,{},"You might have joined already");
            }
            ids2.push(ids);
            console.log(ids2);
            stu.student_id = ids2;
            await stu.save().then((obj) => {
                return responses.successfullyCreatedResponse(
                  res,
                  obj,
                  "Student Enrolled successully!"
                );
              })
              .catch((err) => {
                return responses.badRequestResponse(res, err, "Enrolled failed ! please try again later.");
              });
        }else{
            
          var stu_ids = []
          stu_ids.push(ids);
            const register = new course_register({
                course_id: course_id,
                student_id:stu_ids
             })

            register
            .save()
            .then((obj) => {
            return responses.successfullyCreatedResponse(
                res,
                obj,
                "Student Enrolled successully!"
            );
            })
            .catch((err) => {
                console.log(err);
            return responses.badRequestResponse(res, err, "Enrolled failed ! please try again later.");
            });
            }   
    }
    catch(err)
    {
        return responses.badRequestResponse(res,err,"Server error please try again later");
    }

}

const getStudentCourse = async(req,res) =>{

    try{
        if(!req.params.userid)
          return responses.notFoundResponse(res,"Please provide userID");
        
         const course_find= await course_register.find({student_id:req.params.userid}).populate("course_id");
        //  console.log(course_find);

        var coursedata = [];
        if(course_find)
        {
            course_find.map((obj)=>{
              coursedata.push(obj)
            })   
           }
            
         return responses.successfullyCreatedResponse(res,coursedata,"Enrolled course Received");
       

    }catch(err)
    {
      console.log(err);
      return responses.badRequestResponse(res,err,"Internal error");
    }

}

const getInstructorCourse = async(req,res)=>{
  try{
    if(!req.params.userid)
      return responses.notFoundResponse(res,"Please provide userID");
    
    const insdata = await course.find({instructor_id:req.params.userid})
    
    var coursedata = []
    if(insdata)
  {
      insdata.map((obj)=>{
        coursedata.push(obj)
      })
  }
     return responses.successfullyCreatedResponse(res,insdata,"Created course Received");
   

}catch(err)
{
  console.log(err);
  return responses.badRequestResponse(res,err,"Internal error");
}
}

const getSingleCourse = async(req,res)=>{

    try{

      if(!req.body.id)
      {
        return responses.notFoundResponse(res,"Course Id not found");
      }
      
      let id = new mongoose.Types.ObjectId(req.body.id);
      let course_data = await course.findOne({_id:req.body.id});
      if(!course_data)
        return responses.badRequestResponse(res,{},"Class Not found!");
      
      return responses.successResponse(res,course_data,"Course Details!")
        
        
    }catch(err)
    {
      console.log(err)
      return responses.badRequestResponse(res,err,"Internal error")
    }

}


module.exports = {createCourse,joinCourse,getStudentCourse,getInstructorCourse ,getSingleCourse};