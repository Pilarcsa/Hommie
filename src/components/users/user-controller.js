//maneja los errores y respuestas
import { sendError, sendSucess} from "../../utils/response.js"
import userService from "./user-service.js";

const getUserProfile = async (req, res) => {
    const id = parseInt(req.params.id);
   try{ 
     const user = await userService.getUserProfile(id)
   if (!user) return  sendSucess(res, "usuario no encontrado",null,404)
    sendSucess( res,"usuario encontrado", user)
    }
    catch(err){
    sendError(res, "error del servidor");
    }
}

export default getUserProfile
