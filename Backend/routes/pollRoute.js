const express = require('express')
const router = express.Router()
const {CoursevalidateToken,CourseJoinvalidateToken} = require('../Utils/JWT')
const {PollController,PollVoteController} = require('../controllers/Poll')
router.post('/create',CoursevalidateToken,async(req,res)=>{
    PollController(req,res);
})

router.post('/vote/:id',CourseJoinvalidateToken,async(req,res)=>{

    PollVoteController(req,res);

})

module.exports = router;