import express from "express"
import * as controllerAuth from "./auth-controller.js"
const router = express.Router()

// Crea una ruta POST para el inicio de sesión de usuarios
router.post("/login", controllerAuth.login)

// Exporta el router para usarlo en otras partes de la aplicación
export default router
