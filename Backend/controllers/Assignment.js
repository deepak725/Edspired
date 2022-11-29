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
      return responses.notFoundResponse(res, "Instructor is not registered!");

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
          "Assignment not created!"
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
      !req.body.student_id ||
      !req.body.submission_Date
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
    let dte = new Date(req.body.submission_Date);

    const submission_ = new assignment_submission({
      assignment_id:req.body.assignment_id,
      student_id:req.body.student_id,
      attachments:req.body.attachments,
      submission_Date:req.body.submission_Date

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

module.exports = { assignment_controller, assignment_submission_controller };
