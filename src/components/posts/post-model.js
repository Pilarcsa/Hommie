import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        Comment: "id de usuario"
    },
    description : {
        type: String,
        required: true,
        Comment: `post del usuario`
     },
    createdAt : {
        type: Date,
        default: Date.now
    },
    updateAt : {
        type: Date,
        default: Date.now
    }

});

const postModel = mongoose.model("post", postSchema)

export default postModel;