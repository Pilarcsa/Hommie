// middlewares/auth-middleware.js
import response from "../utils/response.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Verifica que el usuario esté autenticado y valida el token
const authMiddleware = (req, res, next) => {
  try {
    // Obtiene el token desde las cookies o desde el encabezado Authorization
    const cookieToken = req.cookies?.token;
    const header = req.headers.authorization || "";
    const bearerToken = header.startsWith("Bearer ") ? header.slice(7) : null;
    const token = cookieToken || bearerToken;

    if (!token) return response.sendError(res, "no autenticado", 401);

    // Decodifica y verifica el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extrae y valida el id del usuario contenido en el token
    const rawId = decoded?.user?._id;
    if (typeof rawId !== "string" || !mongoose.Types.ObjectId.isValid(rawId)) {
      return response.sendError(res, "id inválido en token", 400);
    }

    // Asigna los datos decodificados al objeto de la solicitud
    req.decoded = { id: rawId, user: decoded.user };

    next(); // pasa al siguiente middleware o controlador
  } catch (error) {
    // Maneja errores de token ausente o inválido
    return response.sendError(res, error.message || "token inválido", 401);
  }
};

export default authMiddleware;
