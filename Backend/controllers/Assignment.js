const assignment = require('../DAO/Models/Assignment_model')
const responses = require('../Utils/responses')
const user = require('../DAO/Models/user_model')
const course = require('../DAO/Models/course_model')
const cloudinary = require('cloudinary')
const fs = require('fs');
const dotenv = require('dotenv')
dotenv.config();


const {
  
    cloudinaryName,
    cloudinaryApiKey,
    cloudinaryApiSecret,
  } = process.env;

cloudinary.v2.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });


const assignment_controller= async(req,res)=>{

    try{
        if(!req.body.assignment_name || !req.body.assignment_dueDate || !req.body.course_id || !req.body.instructor_id)
        {
            return responses.notFoundResponse(res,"Please provide necessary details!");
        }
        // console.log(req.body.assignment_name);
        
        const instructor = await user.findById(req.body.instructor_id);
        if(!instructor)
            return responses.notFoundResponse(res,"Instructor is not registered!");

        const course_ = course.findById(req.body.course_id);

        if(!course_)
            return responses.notFoundResponse(res,"Course not found!");
        
            let pictureFiles = req.files;
            if (!pictureFiles)
                return res.status(400).json({ message: "No picture attached!" });
            
            let multiplePicturePromise = pictureFiles.map((picture) =>
            cloudinary.v2.uploader.upload(picture.path)
            );
            
            let url = []
            let imageResponses = await Promise.all(multiplePicturePromise);
            imageResponses.map((obj)=>{
                url.push(obj.secure_url)
            })
            console.log("images uploaded successfully!");
        let dte = new Date(req.body.assignment_dueDate);
        const assignment_ = new assignment({

            assignment_description:req.body.assignment_description,
            assignment_dueDate:dte,
            assignment_name:req.body.assignment_name,
            course_id:req.body.course_id,
            instructor_id:req.body.instructor_id,
            attachments:url

        })

        assignment_.save()
        .then((obj) => {
          return responses.successfullyCreatedResponse(
            res,
            obj,
            "Assignment created successully"
          );
        })
        .catch((err) => {
            
        console.log(err);
          return responses.badRequestResponse(res,err,"Assignment not created!");
        })

    }
    catch(err)
    {
        console.log(err);
        return responses.badRequestResponse(res,err,"Internal error!");
    }

}

module.exports = {assignment_controller};