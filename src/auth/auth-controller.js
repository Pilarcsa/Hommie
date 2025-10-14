import response from "../utils/response.js"
import serviceUser from "../components/users/user-service.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar entrada
        if (!email || !password) {
            return response.sendError(res, "Email y contraseña son requeridos", 400);
        }

        const user = await serviceUser.getUserByEmail(email);
        if (!user) {
            return response.sendError(res, "Credenciales inválidas", 401);
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return response.sendError(res, "Credenciales inválidas", 401);
        }

        delete user.password;
        const token = jwt.sign({ user }, process.env.JWT_SECRET || 'secreto_por_defecto', {
            expiresIn: "1h"
        });



        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600 * 1000,
        });

        return response.sendSuccess(res, "Inicio de sesión exitoso", { user });

    } catch (error) {
        console.error('Error en login:', error);
        return response.sendError(res, `Error en el servidor: ${error.message}`, 500);
    }
};





/*import response from "../utils/response.js"
import serviceUser from "../components/users/user-service.js" 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req,res) => {

    const {email , password} = req.body
    
    try{
       const user = await serviceUser.getUserByEmail(email) 
     
    if (!user) return  response.sendSucess(res, "email o contraseña incorrecta",null,404)
        const passwordIsValid = await bcrypt.compare(password, user.password)
    if (!passwordIsValid) return  response.sendSucess(res, "email o contraseña incorrecta h",null,404)
       
        const token =  jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "1h"})
     
        delete user.password
   
        res.cookies("token", token, {
            httpOnly : true,
            secure : false,
            sameSite : "lax",
            maxAge : 3600*1000,
        })
  
        return response.sendSucess(res, "login exitoso", {user})
    }catch(error){
        response.sendError(res, "error del servidor");
    }
}*/

