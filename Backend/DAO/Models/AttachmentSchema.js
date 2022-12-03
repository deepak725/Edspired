const mongoose = require('mongoose')


const AttachmentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    material_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'materials'
    },
    url: {
        type:mongoose.SchemaTypes.Url,
        required:true
    },

})

module.exports = mongoose.model("attachments", AttachmentSchema);
