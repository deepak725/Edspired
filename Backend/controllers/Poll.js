const responses = require('../Utils/responses');
const course = require('../DAO/Models/course_model')
const poll = require('../DAO/Models/Poll_model')
const PollController = async(req,res)=>{
    
       try{
        if(!req.body.course_id || !req.body.poll_title || !req.body.options)
        {
            return responses.notFoundResponse(res,"Please provide necessary details to create the poll!");
        }

        const course_find = await course.findById(req.body.course_id);
        if(!course_find)
            return responses.notFoundResponse(res,"Course not found to create the poll");
        
        if(course_find.instructor_id.toString() !== req.body.instructor_id.toString())
        {

            return responses.notFoundResponse(res,"Only course instructor can create the poll!");
        }

        const{course_id,options,poll_title} = req.body;
        
        const poll_doc = await poll.create({
            
                course_id,
                options: options.map(option => ({
                    option,
                    votes: 0
                })),
                poll_title
        })

        poll_doc.save().then((obj)=>{
            console.log(obj);
            return responses.successfullyCreatedResponse(res,obj,"Poll created successfully");
        }).catch((err)=>{   
            console.log(err);
            return responses.badRequestResponse(res,err,"Error in poll creating!")
        })
       }catch(err)
       {
        console.log(err)
        return responses.badRequestResponse(res,err,"Internal error");
       }
}       

const PollVoteController = async(req,res)=>{
    
    try{
        // const {pollID} = req.params.id
        const userID = req.body.student_id
        // const {answer} = req.body.answer

        if(!req.body.answer)
            return responses.notFoundResponse(res,"Please provide answer of poll");
        
        const poll_check = await poll.findById(req.params.id);

        if(!poll_check)
            return responses.notFoundResponse(res,"Poll not found!");

            const vote = poll_check.options.map(op => {
                if(op.option === req.body.answer){
                    
                    return{
                        option: op.option,
                        _id: op._id,
                        votes: op.votes+1
                    }
                }else{
                    return op
                }
            })

            if(poll_check.voted.filter(user => 
                user.toString() === userID.toString()).length <= 0)
            {
                poll_check.voted.push(userID)
                console.log(`Voted by userID ${userID}.`)
                poll_check.options = vote
                await poll_check.save().then((obj)=>{
                    return responses.successfullyCreatedResponse(res,obj,"Voted successfully");
                }).catch((err)=>{
                    return responses.badRequestResponse(res,err,"Error in voting the poll");
                })
                
            }else{
                return responses.badRequestResponse(res,{},"Already voted!");
            }

            
    }catch(err)
    {
        console.log(err);
        return responses.badRequestResponse(res,err,"Internal error");
    }
}
module.exports = {PollController,PollVoteController}