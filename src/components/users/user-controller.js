//maneja los errores y respuestas
import response from "../../utils/response.js"
import userService from "./user-service.js";

// Obtiene el perfil del usuario autenticado usando el id del token
const getUserProfile = async (req, res) => {
  const id = req.decoded.id
  try {
    // Busca el usuario en la base de datos mediante el servicio
    const user = await userService.getUserProfile(id)
    // Si no se encuentra, devuelve respuesta con código 404
    if (!user) return response.sendSuccess(res, "usuario no encontrado", null, 404)
    // Devuelve el perfil del usuario si fue encontrado
    response.sendSuccess(res, "usuario encontrado", user)
  }
  catch (err) {
    // Maneja errores del servidor y devuelve mensaje genérico
    response.sendError(res, "error del servidor");
  }
}

export default getUserProfile //no edites el código original
