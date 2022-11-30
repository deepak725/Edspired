const responses = require('../Utils/responses');
const course = require('../DAO/Models/course_model')
const poll = require('../DAO/Models/Poll_model')
// const course = require('../DAO/Models/course_model')
const PollController = async(req,res)=>{
    
       try{
        if(!req.body.course_id || !req.body.poll_title || !req.body.options)
        {
            return responses.badRequestResponse(res,{},"Please provide question and option both");
        }

        const course_find = await course.findById(req.body.course_id);
        if(!course_find)
            return responses.notFoundResponse(res,"Course not found to create the poll");
        
        if(course_find.instructor_id.toString() !== req.body.instructor_id.toString())
        {

            return responses.notFoundResponse(res,"Only course instructor can create the poll!");
        }

        let option = req.body.options
        if(option.length < 2)
        {
            console.log("reach here")
            return responses.badRequestResponse(res,{},"Please provide atleast 2 option to submit the form!")
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

        if(!req.body.answer_id)
            return responses.notFoundResponse(res,"Please provide answer of poll");
        
        const poll_check = await poll.findById(req.params.id);

        if(!poll_check)
            return responses.notFoundResponse(res,"Poll not found!");

            const vote = poll_check.options.map(op => {
                if(op._id.toString() === req.body.answer_id.toString()){
                    
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

const PollGet = async(req,res)=>{
        try{
            
            if(!req.body.course_id)
            {
                return responses.notFoundResponse(res,"Please provide CourseID");
            }

            const cdata = await course.findById(req.body.course_id)
            if(!cdata)
                return responses.notFoundResponse(res,"Course Not found.")

            const data =await poll.find({course_id : req.body.course_id}).sort({createdAt:-1});
            if(!data)
                return responses.successResponse(res,"No data found!")
            
            return responses.successfullyCreatedResponse(res,data,"Requested Polls!")

        }catch(err)
        {
            console.log(err);
            return responses.badRequestResponse(res,err,"Internal Error!")
        }
}

const PollResult = async(req,res)=>{
    try{

        if(!req.body.instructor_id || !req.params.pollid)
        {
                return  responses.badRequestResponse(res,{},"Instructor Id or poll Id not provided!")
        }

        let pData = await poll.findById(req.params.pollid).populate("course_id")
        if(!pData)
            return responses.badRequestResponse(res,{},"Poll not found please check the poll ID")
       
        console.log(req.body.instructor_id.toString())
        console.log(pData.course_id.instructor_id.toString() )
   
        if(req.body.instructor_id.toString() !== pData.course_id.instructor_id.toString()  )
            return responses.badRequestResponse(res,{},"Only instructor can view the result!");

        // console.log(pData);

        let totalCount = pData.voted.length;
        console.log(totalCount)
        var result = []
        pData.options.map((option)=>{
                let temp = option.votes
                console.log(temp)
                let calc = (temp*100) / totalCount
                console.log(calc)
                result.push({"votesPercent":calc , "title":option.option});
        })    

         return responses.successfullyCreatedResponse(res,result,"poll result!")

    }catch(err)
    {
        console.log(err)
        return responses.badRequestResponse(res,err,"Internal Error");
    }
}
module.exports = {PollController,PollVoteController , PollGet , PollResult}