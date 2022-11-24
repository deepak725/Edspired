const responses = require('../../Utils/responses')
const course = require('../Models/course_model')
const course_create = async(req,res,code)=>{

    const newCourse = new course({
        course_code: code,
        courseName: req.body.courseName,
        instructor_id: req.body.instructor_id,
      });
  
     await newCourse
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
}

module.exports = {course_create}