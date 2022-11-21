const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    instructor_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },

    courseName:{
        type:String,
        required:true,

    },

    assistant_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],

    course_code:{
        type:String,
        required:true,
        unique:true

    }
},{
        timestamps: true,
})

module.exports = mongoose.model("course", courseSchema);