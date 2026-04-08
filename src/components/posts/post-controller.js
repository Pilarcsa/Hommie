import response from "../../utils/response.js";
import postService from "./post-service.js";

import mongoose from "mongoose";

// Crea un nuevo post asociando el usuario autenticado al contenido enviado
const createPost = async (req, res) => {
  try {
  
    const userId = req.decoded?.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return response.sendError(res, "userId inválido", 400);
    }

    const data = { ...req.body };
    delete data.userId;
    data.userId = userId;

    const post = await postService.createPost(data);
    return response.sendSuccess(res, "post creado", post, 201);
  } catch (err) {
    return response.sendError(res, err.message || "error del servidor", 500);
  }
};


// Devuelve los posts creados por el usuario autenticado
const getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return response.sendError(res, "userId inválido", 400);
    }

    const posts = await postService.getPostsByUserId(userId);

    return response.sendSuccess(res, "posts del usuario", posts, 200);
  } catch (error) {
    console.error("Error en getPostsByUserId:", error);
    return response.sendError(res, "error del servidor", 500);
  }
};


// Obtiene todos los posts existentes en la base de datos
const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    if (!posts.length) return response.sendError(res, "no han publicado posts", 404)
    return response.sendSuccess(res, "posts encontrados", posts, 200)
  } catch (error) {
    return response.sendError(res, error.message, 500)
  }
}

// Elimina un post por su id si existe y es válido
const deletePostById = async (req, res) => {
  try {
    const id = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.sendError(res, "id invalido", 400)
    }
    await postService.deletePostById(id)
    return response.sendSuccess(res, "post eliminado exitosamente")
  } catch (error) {
    return response.sendError(res, error.message, 500)
  }
}

// Actualiza un post específico con los datos enviados
const updatePostById = async (req, res) => {
  try {
    const id = req.params.postId;
    const data = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.sendError(res, "id invalido", 400)
    }

    const post = await postService.updatePostById(id, data);
    return response.sendSuccess(res, "post actualizado exitosamente", post)
  } catch (error) {
    return response.sendError(res, error.message, 500)
  }
}

export default {
  createPost,
  getPostsByUserId,
  getAllPosts,
  deletePostById,
  updatePostById
}
