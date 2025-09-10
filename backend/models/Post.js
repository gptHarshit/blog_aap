const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
        minlength: 20
    },
    author : {
        type : String,
        default : 'Anonymous',
    },
    tags: [{ type: String }],
    likes : {
        type : Number,
        default: 0,
    },
    status : {
        type : String, enum : ['draft', 'publised'] , 
        default : 'publised',
    },
}, {timestamps : true});


module.exports = mongoose.model('Post', PostSchema);