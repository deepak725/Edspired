const express = require('express');
const router = express.Router();
const {validateToken} = require('../Utils/JWT')
const {register,login} = require("../controllers/Authorize")
 
router.post("/",(req,res)=>{

    res.send("User Router working fine!");
 })
router.post("/register", async (req, res) => {
    register(req,res);
  });

router.post("/login",async(req,res)=>{
    login(req,res);
});

router.get("/profile",validateToken,async(req,res)=>{



})

  module.exports = router;
  