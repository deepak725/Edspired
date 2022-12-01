const assignment = require("../DAO/Models/Assignment_model");
const responses = require("../Utils/responses");
const user = require("../DAO/Models/user_model");
const course = require("../DAO/Models/course_model");
const cloudinary = require("cloudinary");
const assignment_submission = require("../DAO/Models/Assignment_submit")
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const { cloudinaryName, cloudinaryApiKey, cloudinaryApiSecret } = process.env;

cloudinary.v2.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

const assignment_controller = async (req, res) => {
  try {
    if (
      !req.body.assignment_name ||
      !req.body.assignment_dueDate ||
      !req.body.course_id ||
      !req.body.instructor_id
    ) {
      return responses.notFoundResponse(
        res,
        "Please provide necessary details!"
      );
    }
    // console.log(req.body.assignment_name);

    const instructor = await user.findById(req.body.instructor_id);
    if (!instructor)
      return responses.notFoundResponse(res, "User not found please log in again!");

    const course_ = course.findById(req.body.course_id);

    if (!course_) return responses.notFoundResponse(res, "Course not found!");

    let pictureFiles = req.files;
    if (pictureFiles) {
      let multiplePicturePromise = pictureFiles.map((picture) =>
        cloudinary.v2.uploader.upload(picture.path)
      );

      var url = [];
      let imageResponses = await Promise.all(multiplePicturePromise);
      imageResponses.map((obj) => {
        url.push(obj.secure_url);
      });
      console.log("images uploaded successfully!");
    }
    let dte = new Date(req.body.assignment_dueDate);

    const assignment_ = new assignment({
      assignment_description: req.body.assignment_description,
      assignment_dueDate: dte,
      assignment_name: req.body.assignment_name,
      course_id: req.body.course_id,
      instructor_id: req.body.instructor_id,
      attachments: url,
      points: req.body.Points,
    });

    assignment_
      .save()
      .then((obj) => {
        return responses.successfullyCreatedResponse(
          res,
          obj,
          "Assignment created successully"
        );
      })
      .catch((err) => {
        console.log(err);
        return responses.badRequestResponse(
          res,
          err,
          "For some reason assignment not created! please try after some time or look at the data correctly!"
        );
      });
  } catch (err) {
    console.log(err);
    return responses.badRequestResponse(res, err, "Internal error!");
  }
};

const assignment_submission_controller = async (req, res) => {
  try {
    if (
      !req.body.assignment_id ||
      !req.body.student_id 
    ) {
      return responses.notFoundResponse(
        res,
        "Please provide necessary details to submit the assignment!"
      );
    }

    const assign_data = await assignment.findById(req.body.assignment_id);
    if (!assign_data)
      return responses.unauthorizedResponse(res, "No assignment found!");

    const stu_data = await user.findById(req.body.student_id);
    if (!stu_data)
      return responses.unauthorizedResponse(res, "Student ID not valid!");

    let pictureFiles = req.files;
    if (pictureFiles) {
      let multiplePicturePromise = pictureFiles.map((picture) =>
        cloudinary.v2.uploader.upload(picture.path)
      );

      var url = [];
      let imageResponses = await Promise.all(multiplePicturePromise);
      imageResponses.map((obj) => {
        url.push(obj.secure_url);
      });
      console.log("Assignment files uploaded successfully!");
    }
    let today_dte = new Date().getTime();
    let due_Dte = new Date(assign_data.assignment_dueDate).getTime()
    var status = 0;
    if(today_dte <= due_Dte)
    {
      status = 1;
    }
    else
    {
      status = 2;
    }
    const submission_ = new assignment_submission({
      assignment_id:req.body.assignment_id,
      student_id:req.body.student_id,
      attachments:url,
      submission_Date:today_dte,
      status:status
    })

    submission_.save().then((obj)=>{
        return responses.successfullyCreatedResponse(res,obj,"Assignment Submitted Successfully")
    }).catch((err)=>{
      console.log(err)
      return responses.badRequestResponse(res,err,"Failed to submit")
    })


  } catch (err) {
    console.log(err);
    return responses.badRequestResponse(res, err, "Internal error");
  }
};

const getAllAssignment = async(req,res)=>{
  try{

    if(!req.body.course_id)
    {
        return responses.badRequestResponse(res,{},"Please provide course id!");
    }

    const Data = await assignment.find({course_id:req.body.course_id}).sort({createdAt:-1});

    if(!Data)
    {
        return responses.serverErrorResponse(res,"Course not found with this course id")
    }

    return responses.successfullyCreatedResponse(res,Data,"Assignment results!")



  }catch(err)
  {
    return responses.badRequestResponse(res,err,"Internal error!")
  }
}

const getSingleAssignment = async(req,res)=>{

      try{
            if(!req.params.id)
            {
              return responses.notFoundResponse(res,"Id not provided!")
            }
            
            const data = await assignment.findById(req.params.id)
            if(!data)
            {
              return responses.notFoundResponse(res,"Assignment not found!")
            }

            return responses.successfullyCreatedResponse(res,data,"Assignment details!")

      }catch(err)
      {
        console.log(err)
        return responses.badRequestResponse(res,err,"Internal error")
      }
}

const getAssigDetails = async(req,res)=>{

      try{

        if(!req.body.student_id)
        {
          return responses.badRequestResponse(res,{},"Student Id not provided!");
        }

        const data = await assignment_submission.find({assignment_id:req.params.id}).populate("student_id")
        if(!data)
        {
          return responses.notFoundResponse(res,"No assignment found!")
        }

        return responses.successfullyCreatedResponse(res,data,"Assignment Details!")


      }catch(err)
      {
        console.log(err)
        return responses.badRequestResponse(res,err,"Internal error")
      }
}

module.exports = { assignment_controller, getAssigDetails,assignment_submission_controller ,getAllAssignment , getSingleAssignment };
