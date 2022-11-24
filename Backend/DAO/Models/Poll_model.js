const mongoose = require('mongoose')

const OptionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    },

})
const pollSchema = new mongoose.Schema({

    poll_title:{
        type: String,
        required:true,
    },
    course_id:{
        type:String,
        required:true,
    },
    options:[OptionSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],

},{
    timestamps:true,
})

module.exports = mongoose.model("poll",pollSchema);