const materialSchema = require('../DAO/Models/Material_model')
const AttachmentSchema = require('../DAO/Models/AttachmentSchema')
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


const CreateMaterial = async(req,res)=>{
    try{
        if(!req.body.instructor_id || !req.body.course_id || !req.body.title || !req.body.description)
        {
            return responses.badRequestResponse(res,{},"Please provide instructorID,courseID, material title and descripton !");
        }

        const instructor = await user.findById(req.body.instructor_id);
        if (!instructor)
          return responses.notFoundResponse(res, "User not found please log in again!");
    
        const course_ = course.findById(req.body.course_id);
        if (!course_)
         return responses.notFoundResponse(res, "Course not found!");

         const material =  new materialSchema({
            instructor_id : req.body.instructor_id,
            course_id:req.body.course_id,
            m_title:req.body.title,
            m_Desc:req.body.description
         })

         material.save().then((obj)=>{
                return responses.successfullyCreatedResponse(res,obj,"Material folder created successfully")
         }).catch((err)=>{
                console.log(err)
                return responses.serverErrorResponse(res,"DB error!")
         })   

    }catch(err)
    {
        console.log(err)
        return responses.badRequestResponse(res,{},"Internal error")
    }
}

const UploadFile = async(req,res)=>{
    try{

        if(!req.params.id || !req.body.m_name || !req.files)
        {
          return responses.notFoundResponse(res,"MAterial Id or name not provided!")
        }
        console.log(req.body.m_name)
        const material_ = await materialSchema.findById(req.params.id);
       
        if(!material_)
        {
          return responses.notFoundResponse(res,"material not found!")
        }
            
     let pictureFiles = req.files;
      let multiplePicturePromise = pictureFiles.map((picture) =>
        cloudinary.v2.uploader.upload(picture.path)
      );

      var urls;
      let imageResponses = await Promise.all(multiplePicturePromise);
      imageResponses.map((obj) => {
        urls = obj.secure_url;
      });
      console.log("mateiral uploaded successfully!");
      console.log(urls)
    
      const attachment = new AttachmentSchema({
        name:req.body.m_name,
        url:urls,
        material_id:material_.id

      })

      attachment.save().then((obj)=>{
    
        return responses.successfullyCreatedResponse(res,obj,"Material files uploaded")
            
      }).catch((err)=>
      {
        console.log(err)
        return responses.badRequestResponse(res,err,"Error while uploading files!")
      })

    }catch(err)
    {
        console.log(err)
        return responses.badRequestResponse(res,{},"Internal Error!")
    }
}

const getAll = async(req,res)=>{
    try{

            if(!req.params.id)
            {
                return responses.notFoundResponse(res,"Please provide course id!")
            }

            const course_ = await course.findById(req.params.id)
            if(!course_)    
            {
                return responses.notFoundResponse(res,"Course not found with this id")
            }

            const data = await materialSchema.find({course_id:req.params.id})
            if(!data)
                return responses.notFoundResponse(res,"No material folder found with this id!")    
            
                return responses.successfullyCreatedResponse(res,data,"Material folders!")
        }
        catch(err)
    {
        console.log(err)
        return responses.badRequestResponse(res,{},"Internal Error")
    }
}

const getSingle = async(req,res)=>{
    try{

        if(!req.params.id)
        {
            return responses.notFoundResponse(res,"Material id not found!")
        }

        const data = await materialSchema.findById(req.params.id)
        if(!data)
            return responses.notFoundResponse(res,"MAterial not found in this id!")
            
        return responses.successfullyCreatedResponse(res,data,"Material details")
    }
    catch(err)
    {
        console.log(err)
        return responses.badRequestResponse(res,{},"Internal error!")
    }
}


const getSingleMaterialAttachment = async(req,res)=>{
    try{

        if(!req.params.id)
        {
            return responses.notFoundResponse(res,"Material id not found!")
        }

        const data = await AttachmentSchema.find({material_id:req.params.id}).populate('material_id')
        if(!data)
            return responses.notFoundResponse(res,"MAterial not found in this id!")
       

        return responses.successfullyCreatedResponse(res,data,"Material Attachment details!")
    }
    catch(err)
    {
        console.log(err)
        return responses.badRequestResponse(res,{},"Internal error!")
    }
}
module.exports = {CreateMaterial,UploadFile,getAll,getSingle,getSingleMaterialAttachment}