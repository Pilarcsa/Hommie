import { sendError, sendSucess} from "../utils/response.js"
import serviceUser from "../components/users/user-service.js" 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req,res) => {

    const {email , password} = req.body
    
    try{
       const user = await serviceUser.getUserByEmail(email) 
     
    if (!user) return  sendSucess(res, "email o contraseña incorrecta",null,404)
        const passwordIsValid = await bcrypt.compare(password, user.password)
    if (!passwordIsValid) return  sendSucess(res, "email o contraseña incorrecta h",null,404)
       
        const token =  jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "1h"})
     
        delete user.password
    
        res.cookies("token", token, {
            httpOnly : true,
            secure : false,
            sameSite : "lax",
            maxAge : 3600*1000,
        })

        return sendSucess(res, "login exitoso", {user})
    }catch(error){
        sendError(res, "error del servidor");
    }
}


