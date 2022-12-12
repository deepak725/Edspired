const mongoose = require('mongoose')

const announcementSchema = mongoose.Schema({

    course_id:{
        type:String,
        required:true,
        ref:'course'
    }, 
    creator_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    announcement:{
        type:String,
        required:true
    },
    attachments:[{type: mongoose.SchemaTypes.Url}],
}, {
    timestamps:true,
})


module.exports = mongoose.model("announcement",announcementSchema);