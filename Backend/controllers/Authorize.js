const responses = require("../Utils/responses");
const bcrypt = require("bcrypt");
const users = require("../DAO/Models/user_model")
const {createTokens} = require("../Utils/JWT");
const {createUser,emailExist,loginhelp} = require("../DAO/Access/User");
const { default: mongoose } = require("mongoose");
const Token = require('../DAO/Models/token_model')
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
// const bcrypt = require("bcrypt");


const register = async(req,res)=>{
    try {
        //    const {username,password} = req.body;
        if (!req.body.password || !req.body.email || !req.body.firstname || !req.body.lastname || !req.body.gender) {
          return responses.badRequestResponse(res, {}, "Please provide the necessary details to register!");
        }
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(req.body.password.toString(), salt);
        req.body.password = hash_password;
       
        if (await emailExist(req,res)) {
          console.log('reached-here');
          return responses.unauthorizedResponse(res,"Email Already exists!");
        }
       
        await createUser(req,res);
      } catch (error) {
        console.log(error);
        return responses.serverErrorResponse(res,"Server Error");
      }
}

const login = async(req,res)=>{
    try {
        if (!req.body.password || !req.body.email) {
          return responses.badRequestResponse(res, {}, "Invalid credentials");
        }
        const { password } = req.body;
        // const User = await user.findOne({ email: email });
        // if (!User) {
        //   return responses.unauthorizedResponse(res,"Email is not registered!");
        // }
        // console.log(User);
        const User = await loginhelp(req,res);
        if (!User) {
          return responses.unauthorizedResponse(res,"Email is not registered!");
        }
        const dbPassword = User.password;
        bcrypt.compare(password, dbPassword).then((match) => {
          if (!match) {
            res
              .status(400)
              .json({ error: "Wrong Username and Password Combination!" });
          } else {
            const accessToken = createTokens(User);
    
            res.cookie("access-token", accessToken, {
              maxAge: 60 * 60 * 24 * 30 * 1000,
              httpOnly: true,
            });
            // const userid = User._id;
            
            return responses.successResponse(res,accessToken,"Logged in");
          }
        });
      } catch (err) {
        console.log(err);
        return responses.serverErrorResponse(res);
      }
}

const profile = async(req,res)=>{
   
  try{
    if(!req.body.user_id)
    {
        return responses.badRequestResponse(res,{},"Please provide user id in body section!");
    }
    const id = req.body.user_id;
    // console.log(id);
    const user_Details = await users.findOne({_id:id});
    console.log(user_Details)

    if(!user_Details)
      return responses.notFoundResponse(res,"User not found!");
     
    return responses.successResponse(res,user_Details,"Details of user");
  }catch(err)
  {
    return responses.badRequestResponse(res,err,"Server error!");
  }
      
}

const verifyEmail = async(req,res)=>{
  try{

    let user = await users.findOne({ _id: req.body.user_id });
   
    let token1 = await Token.findOne({userId:user._id});
    if(token1)
    {
      const url = `${process.env.BASE_URL}user/${user.id}/verify/${token1.token}`;
      await sendEmail(user.email, "Verify Email", url,res);
  
    //  return responses.successResponse(res,{},"An Email has been sent to your email account please verify")
    }else{
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      
      const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
      await sendEmail(user.email, "Verify Email", url,res);
  
      // return responses.successResponse(res,{},"An Email has been sent to your email account please verify")
  
    }
      }catch(err)
  {
    console.log(err)
      return responses.badRequestResponse(res,err,"Internal error");
  }
 }

const verifyEmail2 = async (req,res)=>{
  try {
    const user = await users.findOne({ _id: req.params.id });
    if (!user) return responses.badRequestResponse(res,{},"Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return responses.badRequestResponse(res,{},"Invalid link");

    await user.updateOne({verified: true});
    await token.remove();

    return responses.successResponse(res,{},"Email verified successfully!");
  } catch (error) {
    console.log(error);
    return responses.badRequestResponse(res,error,"Internal error");
  }
 }



module.exports = {register,login,profile,verifyEmail,verifyEmail2};