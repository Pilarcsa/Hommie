import response from "../../utils/response.js"
import postService from "./post-service.js";
import mongoose from "mongoose";
import postModel from "./post-model.js";

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

// Obtiene los posts publicados por un usuario específico
const getPostsById = async (req, res) => {
  const id = req.decoded?.user.userId;
  try {
    const posts = await postService.getPostsById(id);
    if (!posts.length) return response.sendError(res, "usuario no ha publicado", 404)
    return response.sendSuccess(res, "posts encontrados", posts, 200)
  } catch (error) {
    return response.sendError(res, error.message, 500)
  }
}

// Devuelve los posts creados por el usuario autenticado
/*const getMyPosts = async (req, res) => {
  try {
    const userId = req.decoded?.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return response.sendError(res, "userId inválido", 400);
    }

    const posts = await postModel
      .find({ userId: new mongoose.Types.ObjectId(userId) })
      .select("-__v");

    return response.sendSuccess(res, "posts del usuario", posts, 200);
  } catch (err) {
    console.error("[/post/me] BYPASS ERROR:", err?.stack || err);
    return response.sendError(res, "error del servidor", 500);
  }
};*/

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
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.sendError(res, "id invalido", 400)
    }
    await postService.deletePost(id)
    return response.sendSuccess(res, "post eliminado exitosamente")
  } catch (error) {
    return response.sendError(res, error.message, 500)
  }
}

// Actualiza un post específico con los datos enviados
const updatePostById = async (req, res) => {
  try {
    const id = req.params.id;
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
  getPostsById,
  getMyPosts,
  getAllPosts,
  deletePost,
  updatePostById
}
