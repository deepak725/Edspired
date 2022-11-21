const responses = require("../Utils/responses");
const course = require("../DAO/Models/course_model");
const course_register = require("../DAO/Models/course_register");
const mongoose = require('mongoose');
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


        console.log(course_find);
        var stu = await course_register.findOne({course_id:course_id })
        var ids = req.body.student_id;
        if(stu)
        {
            var ids2 = stu.student_id;
            // var tok =  mongoose.Schema.Types.ObjectId(ids);
            
            // ids2.map((val)=>{
            //     if(val.toString() === tok.toString())
            //         return responses.badRequestResponse(res,{},"duplicate");
            // })

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
        // console.log(stu);
        // stu.append(req.body.student_id);

      
        // return responses.successfullyCreatedResponse(res);
    }
    catch(err)
    {
        return responses.badRequestResponse(res,err,"Server error please try again later");
    }

}


module.exports = {createCourse,joinCourse};