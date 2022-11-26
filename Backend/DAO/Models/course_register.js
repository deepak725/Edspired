const mongoose = require('mongoose');
const course_register = new mongoose.Schema({

    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'course'
    },
    student_id:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users',
        unique:true
    }]

},{
    timestamps: true,
})

module.exports = mongoose.model("course_register", course_register);