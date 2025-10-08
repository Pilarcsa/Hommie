import express from "express"
import * as controllerAuth from "./auth-controller.js"
const router = express.Router()


router.post("/login", controllerAuth.login)

export default router
