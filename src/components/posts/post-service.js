import postModel from "./post-model.js";

const createPost = async (data) => {
    const post = new postModel(data);
    await post.save()
    const { updateAt , _id, __v, ...cleanedPost } = post.toObject();
    return cleanedPost 

}

const getPostsById = async (id) =>{
    const posts = await postModel.find({userId : id }).select("-__v");
    return posts 
}

const getAllPosts = async () =>{
    const posts = await postModel.find().select("-__v");
    return posts 
}

const deletePost = async (id) =>{
     await postModel.findByIdAndDelete(id)
}

const updatePostById = async (id, data) => {
    console.log(data)
   
    const post = await postModel.findByIdAndUpdate( id, data, { new : true }) 
    console.log(post)
   return post
}

export default { 
    createPost,
    getPostsById,
    getAllPosts,
    deletePost,
    updatePostById
 };

