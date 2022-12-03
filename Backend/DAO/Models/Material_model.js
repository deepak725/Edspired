const mongoose = require('mongoose')


const materialSchema = new mongoose.Schema({

    instructor_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
    course_id:{
        type:String,
        required:true,
        ref:'course'
    },
    m_title:{
        type:String,
        required:true,
    },

    m_Desc:{
        type:String,

    },
    
},{
        timestamps: true,
})

module.exports = mongoose.model("materials", materialSchema);
