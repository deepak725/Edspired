const express = require('express');
const router = express.Router();
const {validateToken,ProfileValidateToken} = require('../Utils/JWT')
const {register,login,profile,verifyEmail,verifyEmail2} = require("../controllers/Authorize")
 
router.post("/",(req,res)=>{

    res.send("User Router working fine!");
 })
router.post("/register", async (req, res) => {
    register(req,res);
  });

router.post("/login",async(req,res)=>{
    login(req,res);
});

router.post("/profile",ProfileValidateToken,async(req,res)=>{

  profile(req,res);

})

router.post("/verify",ProfileValidateToken,async(req,res)=>{

    verifyEmail(req,res);
})
  
router.get("/:id/verify/:token/", async (req, res) => {
  
  verifyEmail2(req,res)
});
 
module.exports = router;
 