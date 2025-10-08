//manejar las rutas solo

import express from "express"
import getUserProfile from "./user-controller.js";

const router = express.Router()

router.get("/user-profile/:id", getUserProfile)

export default router