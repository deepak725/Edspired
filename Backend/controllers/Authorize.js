const responses = require("../Utils/responses");
const bcrypt = require("bcrypt");
const user = require("../DAO/user_model")
const {createTokens} = require("../Utils/JWT");
const register = async(req,res)=>{
    try {
        //    const {username,password} = req.body;
        if (!req.body.password || !req.body.email || !req.body.firstname || !req.body.lastname || !req.body.gender) {
          return responses.badRequestResponse(res, {}, "Please provide the necessary details to register!");
        }
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash_password;
    
        let new_user = await user.create(req.body);
        if (!new_user) {
          return responses.serverErrorResponse(res, "Error while creating user.");
        }
        return responses.successfullyCreatedResponse(res, new_user);
      } catch (error) {
        console.log(error);
        return responses.serverErrorResponse(res,error);
      }
}

const login = async(req,res)=>{
    try {
        if (!req.body.password || !req.body.email) {
          return responses.badRequestResponse(res, {}, "Invalid credentials");
        }
        const { email, password } = req.body;
        const User = await user.findOne({ email: email });
        if (!user) {
          return responses.unauthorizedResponse(res, {}, "User not found");
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
            const userid = User._id;
            return responses.successfullyCreatedResponse(res,userid,"Successfully logged in.");
          }
        });
      } catch (err) {
        // console.log(error);
        return responses.serverErrorResponse(res);
      }
}

module.exports = {register,login};