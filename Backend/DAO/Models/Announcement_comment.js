const mongoose = require('mongoose')

const Announcement_comments = mongoose.Schema({

        creatorid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true
        },
        announcemnetId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'announcement',
            required:true
        },
        comment:{
            type:String,
            required:true
        }

},{
    timestamps:true,
})

module.exports = mongoose.model("announcement_comment",Announcement_comments);