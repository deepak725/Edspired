const announcement = require('../DAO/Models/Announcement_model')
const announcement_comment = require('../DAO/Models/Announcement_comment')
const responses = require("../Utils/responses");
const user = require("../DAO/Models/user_model");
const course = require("../DAO/Models/course_model");
const cloudinary = require("cloudinary");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const { cloudinaryName, cloudinaryApiKey, cloudinaryApiSecret } = process.env;

cloudinary.v2.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});


const createAnnouncement = async(req,res)=>{

        try{
            
                if(!req.body.user_id || !req.body.courseid || !req.body.announcement )
                    return responses.notFoundResponse(res,"Please provide course id , token and announcement data");

                const course_d = await course.findById(req.body.courseid);
                if(!course_d)
                    return responses.badRequestResponse(res,{},"No course found with this id!");

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
                      console.log("attachment uploaded successfully!");
                    }
                
                const Announcement = new announcement({
                    course_id:req.body.courseid,
                    creator_id:req.body.user_id,
                    announcement:req.body.announcement,
                    attachments:url
                })
            Announcement.save().then((obj) => {
                return responses.successfullyCreatedResponse(
                  res,
                  obj,
                  "Announcement created successully"
                );
              })
              .catch((err) => {
                console.log(err);
                return responses.badRequestResponse(
                  res,
                  err,
                  "For some reason Announcement not created! please try after some time or look at the data correctly!"
                );
              });
            
        }catch(err)
        {
            console.log(err);
            return responses.badRequestResponse(res,err,"Internal error!")
        }
}

const getAllAnnouncement = async(req,res)=>{
    try{

        if(!req.params.courseid)
            return responses.notFoundResponse(res,"Please provide courseid");

        const course_d = await course.findById(req.params.courseid);
        if(!course_d)
                return responses.badRequestResponse(res,{},"No course found with this id!");

        const data = await announcement.find({course_id:req.params.courseid}).populate('creator_id');
        
        if(!data)
            return responses.successResponse(res,{},"No announcement data found!")
        
        return responses.successfullyCreatedResponse(res,data,"Annnouncement data!")

    }catch(err){

        console.log(err);
        return responses.badRequestResponse(res,err,"Internal error!")
    }
}


const getSingle = async(req,res)=>{
    try{

        if(!req.params.id)
            return responses.notFoundResponse(res,"Announcement Id not found!")

            const data = await announcement.findById(req.params.id).populate('creator_id');

            if(!data)
                return responses.successResponse(res,{},"No data found!");
            
           return responses.successfullyCreatedResponse(res,data,"Announcement Data");


        }catch(err)
    {
        console.log(err);
        return resposes.badRequestResponse(res,err,"Internal error")
    }
}

const createComment = async(req,res)=>{
    try{
        if(!req.body.user_id || !req.body.announcemnetId || !req.body.comment)
        return responses.notFoundResponse(res,"Please provide token , announcement id and comment!")

        const announce_data = await announcement.findById(req.body.announcemnetId)
        if(!announce_data)
            return responses.notFoundResponse(res,"Announcement not found with this id!")

        const comment = new announcement_comment({
            creatorid:req.body.user_id,
            announcemnetId:req.body.announcemnetId,
            comment:req.body.comment
        })

        comment.save().then((obj) => {
            return responses.successfullyCreatedResponse(
              res,
              obj,
              "Comment created successully"
            );
          })
          .catch((err) => {
            console.log(err);
            return responses.badRequestResponse(
              res,
              err,
              "For some reason Comment not created! please try after some time or look at the data correctly!"
            );
          });

    }catch(err)
    {
        console.log(err);
        return responses.badRequestResponse(res,err,"Internal error!")
    }
}

const getAllComment = async(req,res)=>{
    try{
        if(!req.params.id)
        {
            return responses.notFoundResponse(res,"Announcement Id not found!")
        }

        const anncData = await announcement.findById(req.params.id);
        if(!anncData)
        {
            return responses.notFoundResponse(res,"Announcement not found with is ID")
        }

        const data = await announcement_comment.find({announcemnetId:req.params.id}).populate("creatorid")
        if(!data)
        {
            return responses.successResponse(res,{},"No data found!");
        }

        return responses.successfullyCreatedResponse(res,data,"Comments data!");

    }
    catch(err)
    {
        console.log(err);
        return responses.badRequestResponse(res,err,"Internal Error");
    }
}
module.exports = {createAnnouncement,getAllAnnouncement,getSingle,createComment,getAllComment}