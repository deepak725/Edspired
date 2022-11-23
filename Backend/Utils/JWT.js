const { sign, verify } = require("jsonwebtoken");
var mongoose = require('mongoose');
const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.SECRETMSG
  );

  return accessToken;
};


const validateToken = (req, res, next) => {
  const accessToken = req.body["token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, process.env.SECRETMSG);
    if (validToken) {
      req.authenticated = true;
      return next();
    }

  } catch (err) {
    return res.status(400).json({ error: err });
  }
};


const CoursevalidateToken = (req, res, next) => {
  const accessToken = req.body["token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, process.env.SECRETMSG);
    if (validToken) {
      console.log(validToken.id);
      
      req.body.instructor_id = mongoose.Types.ObjectId(validToken.id);
      req.authenticated = true;
      return next();
    }

  } catch (err) {
    return res.status(400).json({ error: err });
  }
};


const CourseJoinvalidateToken = (req, res, next) => {
  const accessToken = req.body["token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, process.env.SECRETMSG);
    if (validToken) {
      console.log(validToken.id);
      
      req.body.student_id = mongoose.Types.ObjectId(validToken.id);
      req.authenticated = true;
      return next();
    }

  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const ProfileValidateToken = (req, res, next) => {
  const accessToken = req.body["token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, process.env.SECRETMSG);
    if (validToken) {
      // console.log(validToken.id);
      
      req.body.user_id = mongoose.Types.ObjectId(validToken.id);
      req.authenticated = true;
      return next();
    }

  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken  , CoursevalidateToken , CourseJoinvalidateToken,ProfileValidateToken};