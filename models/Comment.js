const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema({
    // set custom id to avoid confusion with parent comment_id
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String
    },
    writtenBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
});
const CommentScehma = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

CommentScehma.virtual("replyCount").get(function() {
    return this.replies.length;
});

const Comment = model("Comment", CommentScehma);

module.exports = Comment;