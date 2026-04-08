import express from "express";
import postController from "./post-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";

const router = express.Router();

// Define las rutas principales para crear, leer, actualizar y eliminar posts
router.post("/", authMiddleware, postController.createPost);
router.get("/feed", postController.getAllPosts);
router.get("/:userId", authMiddleware, postController.getPostsByUserId);
router.patch("/:postId", authMiddleware, postController.updatePostById);
router.delete("/:postId", authMiddleware, postController.deletePostById);

// Exporta el router para integrarlo en la aplicación principal
export default router;
