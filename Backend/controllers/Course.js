const responses = require("../Utils/responses");
const course = require("../DAO/Models/course_model");
const course_register = require("../DAO/Models/course_register");
const users = require("../DAO/Models/user_model");
const mongoose = require('mongoose');
const { response } = require("express");

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

    const instructor = await users.findById(req.body.instructor_id);

    if(!instructor)
        return responses.badRequestResponse(res,{},"Your user id not found in system!");
     
    if(!instructor.verified)    
        return responses.badRequestResponse(res,{},"Your email is not verified in system. please verify it in profile section!");

    const newCourse = new course({
      course_code: code,
      courseName: req.body.courseName,
      instructor_id: req.body.instructor_id,
    });

    newCourse
      .save()
      .then((obj) => {
        return responses.successfullyCreatedResponse(
          res,
          obj,
          "Course created successully"
        );
      })
      .catch((err) => {
        return responses.badRequestResponse(res, err, "course not created");
      });

  } catch (err) {
    return responses.notFoundResponse(res, err);
  }
};

const joinCourse = async(req,res) => {

    try{
        if(!req.body.courseCode)
        {
            return responses.badRequestResponse(res,{},"Course code not provided");
        }

        const course_find = await course.findOne({ course_code: req.body.courseCode});
        if(!course_find)
            return responses.badRequestResponse(res,{},"Course not found! please check the course code.");
        

        let course_id = course_find._id;    
        let inst_id = course_find.instructor_id;

        // console.log(course_find);
        var stu = await course_register.findOne({course_id:course_id })
        var ids = req.body.student_id;
        
        if(inst_id.toString() === ids.toString())
        {
            return responses.badRequestResponse(res,{},"Instructor can't its own class!");
        }
        if(stu)
        {
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
                return responses.badRequestResponse(res,{},"Duplicate values!");
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
                return responses.badRequestResponse(res, err, "Student not enrolled");
              });
        }else{
            
            const register = new course_register({
                course_id: course_id,
                student_id:ids
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
            return responses.badRequestResponse(res);
            });
            }   
    }
    catch(err)
    {
        return responses.badRequestResponse(res,err,"Server error please try again later");
    }

}



module.exports = {createCourse,joinCourse};