import response from "../utils/response.js";
import jwt from "jsonwebtoken";

const authMidleware = (req,res,next) => {
    try{
        const token = req.cookies.token
        if(!token) return response.sendError(res, "no autenticado", 401);
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return response.sendError(res, "token invalido", 401);
        req.decoded = decoded
        console.log(req.decoded)
        next()
    }catch(error){
        return response.sendError(res, error.message, 500)
    }
}

export default authMidleware