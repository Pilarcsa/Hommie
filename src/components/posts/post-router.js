//manejar las rutas solo
import express from "express"
import postController from "./post-controller.js"
import authMiddleware from "../../middlewares/auth-middleware.js";

const router = express.Router()


router.post("/", authMiddleware, postController.createPost);//si no estoy logeado no es posible crear un post //ni contactar con otros usuarios
router.get("/feed", postController.getAllPosts);//comenta error
router.get("/:id", postController.getPostsById);
router.patch("/:id", authMiddleware, postController.updatePostById)
router.delete("/:id", authMiddleware, postController.deletePost);


export default router