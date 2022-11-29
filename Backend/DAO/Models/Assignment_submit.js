const mongoose = require('mongoose');

const Assignment_submit = new mongoose.Schema({

    assignment_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'assignment'
    },
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    attachments:[{type: mongoose.SchemaTypes.Url}],
    submission_Date:{
        type:Date,
        required:true
    },

},{
    timestamps: true,
})

module.exports = mongoose.model("assignment_submissions", Assignment_submit);