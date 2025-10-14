//maneja los errores y respuestas
import response from "../../utils/response.js"
import userService from "./user-service.js";

const getUserProfile = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await userService.getUserProfile(id)
    if (!user) return response.sendSuccess(res, "usuario no encontrado", null, 404)
    response.sendSuccess(res, "usuario encontrado", user)
  }
  catch (err) {
    response.sendError(res, "error del servidor");
  }
}

export default getUserProfile
