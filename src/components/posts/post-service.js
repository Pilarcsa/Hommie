import postModel from "./post-model.js";
import mongoose from "mongoose";
import userModel from "../users/users-model.js";

// Convierte un string a ObjectId de MongoDB
const toOid = (id) => new mongoose.Types.ObjectId(id);

// Crea y guarda un post; devuelve el objeto sin campos internos
const createPost = async (data) => {
  const post = new postModel(data);
  await post.save();
  const { updatedAt, __v, ...cleanedPost } = post.toObject();
  return cleanedPost;
};

// Busca posts por userId y añade datos básicos del usuario
const getPostsByUserId = async (userId) => {
  const posts = await postModel.find({ userId: new mongoose.Types.ObjectId(userId)}).populate("userId", "fullName age ocupation avatarUrl").select("-__v");
  return posts;
}

const getAllPosts = async () => {
    console.log("modelos registrados:", mongoose.modelNames()); // ← añade esto
  const posts = await postModel.find().populate("userId", "fullName age ocupation avatarUrl").select("-__v") .lean();
   console.log("userId:", JSON.stringify(posts[0]?.userId)); // ← y esta
  return posts;
  
};

const deletePostById = async (id) => {
  await postModel.findByIdAndDelete(id);
};

// Actualiza por id y devuelve el documento actualizado
const updatePostById = async (id, data) => {
  const post = await postModel.findByIdAndUpdate(id, data, { new: true });
  return post;
};

export default {
  createPost,
  getPostsByUserId,
  getAllPosts,
  deletePostById,
  updatePostById,
};
