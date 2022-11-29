const mongoose = require('mongoose');
require('mongoose-type-url');
// id
// timestamp
// name
// descr
// duedate
//file urls
// course_id
// instructor_id
const assignmentSchema = new mongoose.Schema({

        assignment_name:{
            type: String,
            required:true
        },
        assignment_description:{
            type:String
        },
        assignment_dueDate:{
            type:Date,
            required:true
        },
        attachments:[{type: mongoose.SchemaTypes.Url}],
        course_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'course'
        },
        instructor_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'users'
        },
        points:{
            type:Number,
            required:true,
        }


},{
    timestamps: true,
})


module.exports = mongoose.model("assignment", assignmentSchema);