import response from "../utils/response.js"
import serviceUser from "../components/users/user-service.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica que el usuario haya enviado email y contraseña
        if (!email || !password) {
            return response.sendError(res, "Email y contraseña son requeridos", 400);
        }

        // Busca al usuario en la base de datos por su email
        const user = await serviceUser.getUserByEmail(email);
        if (!user) {
            return response.sendError(res, "Credenciales inválidas", 401);
        }

        // Compara la contraseña ingresada con la almacenada en la base de datos
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return response.sendError(res, "Credenciales inválidas", 401);
        }

        // Crea un token JWT y lo guarda como cookie segura
        delete user.password;
        const token = jwt.sign({ user }, process.env.JWT_SECRET || 'secreto_por_defecto', {
            expiresIn: "1h"
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600 * 1000,
        });

        // Envía respuesta exitosa con los datos del usuario
        return response.sendSuccess(res, "Inicio de sesión exitoso", { user });

    } catch (error) {
        console.error('Error en login:', error);
        return response.sendError(res, `Error en el servidor: ${error.message}`, 500);
    }
};
