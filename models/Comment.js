const { Schema, model } = require("mongoose");

const CommentScehma = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = model("Comment", CommentScehma);

module.exports = Comment;