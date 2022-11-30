const express = require('express')
const router = express.Router()
const {CoursevalidateToken,CourseJoinvalidateToken} = require('../Utils/JWT')
const {PollController,PollVoteController,PollGet,PollResult} = require('../controllers/Poll')
router.post('/create',CoursevalidateToken,async(req,res)=>{
    PollController(req,res);
})

router.post('/vote/:id',CourseJoinvalidateToken,async(req,res)=>{

    PollVoteController(req,res);

})

router.post('/getPoll',async(req,res)=>{
    PollGet(req,res);
})

router.post('/result/:pollid',CoursevalidateToken,async(req,res)=>{
    PollResult(req,res);
})
module.exports = router;