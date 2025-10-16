import response from "../../utils/response.js"
import userService from "../users/user-service.js";
import postService from "./post-service.js";
import mongoose from "mongoose";

const createPost = async (req, res) => {
    const { description } = req.body;
    const { userId } = req.decoded.user;
    console.log(userId)
    try {
        if (!description) return response.sendError(res, "uno o mas campos requeridos no fueron enviados")
        const user = userService.getUserProfile(userId);
        if (!user) return response.sendError(res, "usuario no encontrado", 404)
        const post = await postService.createPost({ userId, description }); console.log(post)
        return response.sendSuccess(res, "post creado exitosamente", post, 201)

    } catch (error) {
        return response.sendError(res, error.message, 500)
    }
}

const getPostsById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const posts = await postService.getPostsById(id);
        console.log(id)
        if (!posts.length) return response.sendError(res, "usuario no ha publicado", 404)
        return response.sendSuccess(res, "posts encontrados", posts, 200)

    } catch (error) {
        return response.sendError(res, error.message, 500)

    }
}

const getAllPosts = async (req, res) => {

    try {
        const posts = await postService.getAllPosts();
        if (!posts.length) return response.sendError(res, "no han publicado posts", 404)
        return response.sendSuccess(res, "posts encontrados", posts, 200)

    } catch (error) {
        return response.sendError(res, error.message, 500)
    }
}

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

const updatePostById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.sendError(res, "id invalido", 400)
        }
        
        const post = await postService.updatePostById( id, data);
        console.log(post)
        return response.sendSuccess(res, "post actualizado exitosamente", post)
    } catch (error) {
        return response.sendError(res, error.message, 500)
    }
}

export default {
    createPost,
    getPostsById,
    getAllPosts,
    deletePost,
    updatePostById
}

