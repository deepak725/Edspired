const mongoose = require('mongoose')
const user = require('../Models/user_model')
const responses = require('../../Utils/responses')

const createUser = async(req,res)=>{
    let new_user = await user.create(req.body);
        if (!new_user) {
          return responses.serverErrorResponse(res, "Error while creating user.");
        }
        return responses.successfullyCreatedResponse(res, new_user);
}

const emailExist = async(req,res) =>{
    const email = req.body.email;
     const User = await user.findOne({ email: email });
     if(User)
        return true;
    
    return false;
}

const idExist = async(req,id) =>{
    
    const User = await user.findById(id)
    if(User)
        return User;
    return false;
}

const loginhelp = async(req,res)=>{
     const { email } = req.body;
        const User = await user.findOne({ email: email });
       
       return User; 
}

module.exports = {createUser ,emailExist , loginhelp , idExist};