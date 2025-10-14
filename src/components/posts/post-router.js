//manejar las rutas solo
import express from "express"
import postController from "./post-controller.js"

const router = express.Router()

router.post("/", postController.createPost);
router.get("/:id", postController.getPosts);

export default router