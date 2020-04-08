const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    images:{
        type: String,
    },
    post_time:{
        type: Date,
        // Create a default 'report_time' value
        default: Date.now
    },
    authorEmail:{
        type:String,
        required:true
    }
})

module.exports = Post = mongoose.model('posts', PostSchema)