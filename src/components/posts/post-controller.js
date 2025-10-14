import response from "../../utils/response.js"
import userService from "../users/user-service.js";
import postService from "./post-service.js";

const createPost = async (req, res) => {
    const { userId, description } = req.body;
    try {
        if (!userId || !description) return response.sendError(res, "uno o mas campos requeridos no fueron enviados")
        const user = userService.getUserProfile(userId);
        if (!user) return response.sendError(res, "usuario no encontrado", 404)
        const post = await postService.createPost({ userId, description }); console.log(post)
        return response.sendSuccess(res, "post creado exitosamente", post, 201)

    } catch (error) {
        return response.sendError(res, error.message, 500)
    }
}

const getPosts = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const posts = await postService.getPosts(id);
        console.log(id)
        if (!posts.length) return response.sendError(res, "usuario no ha publicado", 404)
        return response.sendSuccess(res, "posts encontrados", posts, 200)

    } catch (error) {
        return response.sendError(res, error.message, 500)

    }
}
export default {
    createPost,
    getPosts
}

