//manejar las rutas solo

import express from "express"
import getUserProfile from "./user-controller.js";

const router = express.Router();

// Define la ruta GET para obtener el perfil de un usuario por su id
router.get("/user-profile/:id", getUserProfile);

// Exporta el router para usarlo en el servidor principal
export default router;
