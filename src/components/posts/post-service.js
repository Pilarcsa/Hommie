import postModel from "./post-model.js";

const createPost = async (data) => {
    const post = new postModel(data);
    await post.save()
    const { updateAt , _id, __v, ...cleanedPost } = post.toObject();
    return cleanedPost 

}

const getPosts = async (id) =>{
    const posts = await postModel.find({userId : id }).select("-__v");
    return posts 
}

export default { 
    createPost,
    getPosts
 };

