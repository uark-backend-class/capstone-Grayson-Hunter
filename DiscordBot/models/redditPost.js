const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    url: {
        type: String,
        required: false,
    }
})

const RedditPost = mongoose.model('RedditPost', postSchema)
module.exports = RedditPost 