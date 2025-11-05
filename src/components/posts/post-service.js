import postModel from "./post-model.js";
import mongoose from "mongoose";

// Convierte un string a ObjectId de MongoDB
const toOid = (id) => new mongoose.Types.ObjectId(id);

// Crea y guarda un post; devuelve el objeto sin campos internos
const createPost = async (data) => {
  const post = new postModel(data);
  await post.save();
  const { updatedAt, _id, __v, ...cleanedPost } = post.toObject();
  return cleanedPost;
};

// Busca posts por userId y añade datos básicos del usuario
/*const getPostsById = async (id) => {
  console.log(id)
  const posts = await postModel
    .find({ userId: id })
    .populate("userId", "fullName avatarUrl age city occupation title description")
    .select("-__v");
  return posts;
};*/
const getPostsById = async(id) =>{
const posts = await postModel.find({userId:id}).select("-__v")
return posts
}

// Obtiene posts del usuario autenticado usando ObjectId normalizado
/*const getMyPosts = async (userId) => {
  return postModel.find({ userId: toOid(userId) }).select("-__v");};*/

const getAllPosts = async () => {
  const posts = await postModel.find().select("-__v");
  return posts;
};

const deletePost = async (id) => {
  await postModel.findByIdAndDelete(id);
};

// Actualiza por id y devuelve el documento actualizado
const updatePostById = async (id, data) => {
  const post = await postModel.findByIdAndUpdate(id, data, { new: true });
  return post;
};

export default {
  createPost,
  getPostsById,
  getMyPosts,
  getAllPosts,
  deletePost,
  updatePostById,
};
